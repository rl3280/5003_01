const appState = {
  condition_1: null,
  condition_2: null,
  condition_3: null,
  currentStep: "reset",
  rows: []
};

const elements = {
  secondContainer: document.getElementById("second_container"),
  secondSlider: document.getElementById("secondSlider"),
  studentLabel: document.getElementById("studentLabel"),
  classLabel: document.getElementById("classLabel"),
  pairLabel: document.getElementById("pairLabel"),
  cohortLabel: document.getElementById("cohortLabel"),
  sIDLabel: document.getElementById("sIDLabel"),
  sIDDropdown: document.getElementById("sIDDropdown"),
  cohortSelectLabel: document.getElementById("cohortSelectLabel"),
  cohortDropdown: document.getElementById("cohortDropdown"),
  goButton: document.getElementById("goButton"),
  resultTitle: document.getElementById("resultTitle"),
  resultContent: document.getElementById("resultContent")
};

function resetState() {
  appState.condition_1 = null;
  appState.condition_2 = null;
  appState.condition_3 = null;
  appState.currentStep = "reset";
  render();
}

function hasValidSelection() {
  return Boolean(
    appState.condition_1 &&
    appState.condition_2 &&
    appState.condition_3
  );
}

function render() {
  const isStudent = appState.condition_1 === "Student";
  const isClass = appState.condition_1 === "Class";
  const isPairOrReteach = appState.condition_2 === "Pair" || appState.condition_2 === "Reteach";
  const canGo = hasValidSelection();

  setStateClass(elements.studentLabel, isStudent);
  setStateClass(elements.classLabel, isClass);
  setStateClass(elements.pairLabel, appState.condition_2 === "Pair");
  setStateClass(elements.cohortLabel, appState.condition_2 === "Reteach");

  elements.secondContainer.className = isClass ? "container active" : "container inactive";
  elements.secondSlider.className = isClass ? "slider active" : "slider disabled";

  elements.sIDDropdown.disabled = !isStudent;
  elements.sIDDropdown.className = isStudent ? "dropdown active" : "dropdown inactive";
  elements.sIDLabel.className = isStudent ? "active" : "inactive";

  elements.cohortDropdown.disabled = !isPairOrReteach;
  elements.cohortDropdown.className = isPairOrReteach ? "dropdown active" : "dropdown inactive";
  elements.cohortSelectLabel.className = isPairOrReteach ? "active" : "inactive";

  elements.goButton.disabled = !canGo;
  elements.goButton.className = canGo ? "enabled" : "disabled";
}

function setStateClass(element, isActive) {
  element.className = isActive ? "choice active" : "choice inactive";
}

function fillDropdowns() {
  const studentIDs = appState.rows.map(row => row.sID).sort((a, b) => a - b);
  const cohorts = [...new Set(appState.rows.map(row => row.class))].sort();

  addOptions(elements.sIDDropdown, studentIDs, "Choose a student");
  addOptions(elements.cohortDropdown, cohorts, "Choose a cohort");
}

function addOptions(select, values, firstLabel) {
  select.innerHTML = "";
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.textContent = firstLabel;
  select.appendChild(firstOption);

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function runQuery(state, rows) {
  if (state.condition_1 === "Student" && state.condition_2 === "sID") {
    return tutorQuery(rows, state.condition_3);
  }

  if (state.condition_1 === "Class" && state.condition_2 === "Pair") {
    return pairQuery(rows, state.condition_3);
  }

  if (state.condition_1 === "Class" && state.condition_2 === "Reteach") {
    return reteachQuery(rows, state.condition_3);
  }

  return {
    type: "invalid",
    title: "Invalid selection",
    message: "Please choose a valid selection."
  };
}

function tutorQuery(rows, selectedSID) {
  const studentRow = rows.find(row => row.sID === Number(selectedSID));

  if (!studentRow) {
    return { type: "tutor", title: "Student not found", items: [] };
  }

  const missedItems = Object.keys(studentRow)
    .filter(isMathField)
    .filter(code => studentRow[code] === false)
    .map(code => ({ code: code, label: translateCodeToLabel(code) }));

  return {
    type: "tutor",
    title: "Missed questions for student " + selectedSID,
    items: missedItems
  };
}

function pairQuery(rows, selectedCohort) {
  const students = rows
    .filter(row => row.class === selectedCohort)
    .map(row => ({
      sID: row.sID,
      trueTotal: countTrueValues(row)
    }))
    .filter(student => student.trueTotal >= 50)
    .sort((a, b) => b.trueTotal - a.trueTotal);

  const pairs = [];
  const half = Math.floor(students.length / 2);

  for (let index = 0; index < half; index++) {
    pairs.push([
      students[index].sID,
      students[students.length - 1 - index].sID
    ]);
  }

  return {
    type: "pair",
    title: "Paired students for " + selectedCohort,
    pairs: pairs
  };
}

function reteachQuery(rows, selectedCohort) {
  const classRows = rows.filter(row => row.class === selectedCohort);
  const fieldTotals = {};

  classRows.forEach(row => {
    Object.keys(row).filter(isMathField).forEach(code => {
      if (!fieldTotals[code]) {
        fieldTotals[code] = 0;
      }
      if (row[code] === true) {
        fieldTotals[code]++;
      }
    });
  });

  const items = Object.entries(fieldTotals)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([code, total]) => ({
      code: code,
      total: total,
      label: translateCodeToLabel(code)
    }));

  return {
    type: "reteach",
    title: "Reteach priorities for " + selectedCohort,
    items: items
  };
}

function isMathField(key) {
  return key.endsWith("_fi1") || key.endsWith("_fi2");
}

function countTrueValues(row) {
  return Object.keys(row)
    .filter(key => key !== "sID" && key !== "class")
    .filter(code => row[code] === true)
    .length;
}

function translateCodeToLabel(code) {
  const endings = {
    "_fi1": "Feet & Inches assignment 1",
    "_fi2": "Feet & Inches assignment 2"
  };
  const ending = Object.keys(endings).find(suffix => code.endsWith(suffix));
  const questionNumber = code.split("_")[0].replace(/^[^0-9]*/, "");
  const assignmentName = ending ? endings[ending] : "Math assignment";

  return assignmentName + ", question " + questionNumber + " (" + code + ")";
}

function displayResult(result) {
  elements.resultTitle.textContent = result.title;
  elements.resultContent.innerHTML = "";

  if (result.type === "tutor" || result.type === "reteach") {
    const list = document.createElement("ul");
    result.items.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = result.type === "reteach"
        ? item.label + " - " + item.total + " correct"
        : item.label;
      list.appendChild(listItem);
    });
    elements.resultContent.appendChild(list);
    return;
  }

  if (result.type === "pair") {
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Student 1</th><th>Student 2</th></tr>";
    result.pairs.forEach(pair => {
      const row = table.insertRow();
      row.insertCell().textContent = pair[0];
      row.insertCell().textContent = pair[1];
    });
    elements.resultContent.appendChild(table);
    return;
  }

  elements.resultContent.textContent = result.message;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");

  return lines.slice(1).map(line => {
    const values = line.split(",");
    const row = {};

    headers.forEach((header, index) => {
      const value = values[index];
      row[header] = value === "TRUE" ? true : value === "FALSE" ? false : value;
    });

    row.sID = Number(row.sID);
    return row;
  });
}

async function loadData() {
  try {
    const response = await fetch("../dat/scores.csv");
    const csvText = await response.text();
    appState.rows = parseCsv(csvText);
    fillDropdowns();
  } catch (error) {
    elements.resultTitle.textContent = "Data could not be loaded";
    elements.resultContent.textContent = "Open this app through a local web server so it can read scores.csv.";
  }
}

document.getElementById("studentLabel").addEventListener("click", () => {
  appState.condition_1 = "Student";
  appState.condition_2 = null;
  appState.condition_3 = null;
  appState.currentStep = "student";
  render();
});

document.getElementById("classLabel").addEventListener("click", () => {
  appState.condition_1 = "Class";
  appState.condition_2 = null;
  appState.condition_3 = null;
  appState.currentStep = "class";
  render();
});

document.getElementById("pairLabel").addEventListener("click", () => {
  if (appState.condition_1 !== "Class") return;
  appState.condition_2 = "Pair";
  appState.condition_3 = null;
  appState.currentStep = "pair";
  render();
});

document.getElementById("cohortLabel").addEventListener("click", () => {
  if (appState.condition_1 !== "Class") return;
  appState.condition_2 = "Reteach";
  appState.condition_3 = null;
  appState.currentStep = "reteach";
  render();
});

elements.sIDDropdown.addEventListener("change", event => {
  appState.condition_2 = event.target.value ? "sID" : null;
  appState.condition_3 = event.target.value ? Number(event.target.value) : null;
  render();
});

elements.cohortDropdown.addEventListener("change", event => {
  appState.condition_3 = event.target.value || null;
  render();
});

document.getElementById("resetButton").addEventListener("click", resetState);

elements.goButton.addEventListener("click", () => {
  if (!hasValidSelection()) return;
  const result = runQuery(appState, appState.rows);
  displayResult(result);
  appState.currentStep = "return";
});

resetState();
loadData();