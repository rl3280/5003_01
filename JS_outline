
## Beginner-friendly JavaScript outline

This is the clean way to connect the GUI state to the query logic in `QUERY.md`.

The main idea is:

- the GUI creates a state object
- JavaScript checks which query should run
- one function runs the correct query
- the result is returned to the GUI display area

---

## 1) Start with the state object

Keep it simple:

```javascript
const appState = {
  condition_1: null,   // "Student" or "Class"
  condition_2: null,   // "sID", "Pair", or "Reteach"
  condition_3: null    // selected sID or cohort
};
```

This matches the exact logic from `QUERY.md`:

- Student + sID
- Class + Pair + cohort
- Class + Reteach + cohort

---

## 2) Add one selector function

This is the “traffic cop” function.

It decides which query to run based on the conditions.

```javascript
function runQuery(state, rows) {
  if (state.condition_1 === "Student" && state.condition_2 === "sID") {
    return tutorQuery(rows, state.condition_3);
  }

  if (state.condition_1 === "Class" && state.condition_2 === "Pair" && state.condition_3) {
    return pairQuery(rows, state.condition_3);
  }

  if (state.condition_1 === "Class" && state.condition_2 === "Reteach" && state.condition_3) {
    return reteachQuery(rows, state.condition_3);
  }

  return {
    type: "invalid",
    message: "Please choose a valid selection."
  };
}
```

### Why this is good
It is easy to read, easy to test, and easy to edit.

Each query is separate and has one job.

---

## 3) Assume the CSV data is already parsed

For JavaScript, the easiest approach is to parse `scores.csv` into an array of objects.

Example idea:

```javascript
[
  {
    sID: 101,
    class: "bcp-176",
    "1f_fi1": true,
    "1i_fi1": true,
    ...
  },
  ...
]
```

This is not the only way to do it, but it is the easiest for a beginner to understand.

---

## 4) TUTOR query

This query runs when the teacher picks a student.

### Rule
- pick the row for the student
- keep only fields ending in _fi1 or _fi2
- find all FALSE values
- translate the codes using `dict.md`

### JavaScript outline

```javascript
function tutorQuery(rows, selectedSID) {
  const studentRow = rows.find(row => row.sID == selectedSID);

  if (!studentRow) {
    return {
      type: "tutor",
      title: "Student not found",
      items: []
    };
  }

  const fieldCodes = Object.keys(studentRow)
    .filter(key => key !== "sID" && key !== "class")
    .filter(key => key.endsWith("_fi1") || key.endsWith("_fi2"));

  const missed = fieldCodes
    .filter(code => studentRow[code] === false)
    .map(code => ({
      code: code,
      label: translateCodeToLabel(code)
    }));

  return {
    type: "tutor",
    title: "Missed questions for student " + selectedSID,
    items: missed
  };
}
```

### Simple explanation
- Object.keys(studentRow) gets the field names
- filter(...) keeps only math fields
- studentRow[code] === false finds the missed questions
- translateCodeToLabel(...) turns codes like 3i_fi1 into teacher language

---

## 5) PAIR query

This query runs when the teacher chooses Class + Pair + cohort.

### Rule
1. Keep only students in the chosen class
2. Count TRUE values in every student row
3. Remove any student with fewer than 50 TRUE values
4. Sort by total TRUE count
5. Build a two-column pair list

### JavaScript outline

```javascript
function pairQuery(rows, selectedCohort) {
  const classRows = rows.filter(row => row.class === selectedCohort);

  const scoredStudents = classRows.map(row => {
    const keys = Object.keys(row).filter(key => key !== "sID" && key !== "class");
    const trueTotal = keys.filter(key => row[key] === true).length;

    return {
      sID: row.sID,
      trueTotal: trueTotal
    };
  });

  const validStudents = scoredStudents.filter(student => student.trueTotal >= 50);

  validStudents.sort((a, b) => b.trueTotal - a.trueTotal);

  const pairedRows = [];
  const half = Math.floor(validStudents.length / 2);

  for (let i = 0; i < half; i++) {
    pairedRows.push([
      validStudents[i].sID,
      validStudents[validStudents.length - 1 - i].sID
    ]);
  }

  return {
    type: "pair",
    title: "Paired students for " + selectedCohort,
    pairs: pairedRows
  };
}
```

### Important note
This is a beginner version. It keeps the logic visible and easy to fix.

The idea is:
- highest totals on one side
- lowest totals on the other side
- pair them in order

---

## 6) RETEACH query

This query runs when the teacher chooses Class + Reteach + cohort.

### Rule
1. Keep only students in that class
2. Keep only _fi1 and _fi2 fields
3. Count TRUE values for each field code across the class
4. Pick the 3 lowest totals
5. Translate those codes into teacher-friendly language

### JavaScript outline

```javascript
function reteachQuery(rows, selectedCohort) {
  const classRows = rows.filter(row => row.class === selectedCohort);

  const fieldTotals = {};

  const fieldNames = Object.keys(classRows[0] || {})
    .filter(key => key !== "sID" && key !== "class")
    .filter(key => key.endsWith("_fi1") || key.endsWith("_fi2"));

  for (const field of fieldNames) {
    let totalTrue = 0;

    for (const row of classRows) {
      if (row[field] === true) {
        totalTrue++;
      }
    }

    fieldTotals[field] = totalTrue;
  }

  const lowestThree = Object.entries(fieldTotals)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3);

  const items = lowestThree.map(([code, total]) => ({
    code,
    total,
    label: translateCodeToLabel(code)
  }));

  return {
    type: "reteach",
    title: "Reteach priorities for " + selectedCohort,
    items: items
  };
}
```

### Simple explanation
This is the class-wide “lowest performance” list.

The lowest TRUE counts mean the class missed those questions most often.

---

## 7) Translate field codes

This part is very important.

You need a simple dictionary function to convert codes like:

- 3i_fi1
- 4f_fi2
- w02_r1

into teacher-friendly text.

Example:

```javascript
function translateCodeToLabel(code) {
  const labelMap = {
    "3i_fi1": "Feet & Inches Homework #1, Question #3",
    "6i_fi1": "Feet & Inches Homework #1, Question #6",
    "1i_fi2": "Feet & Inches Homework #2, Question #1",
    "4f_fi2": "Feet & Inches Homework #2, Question #4",
    "5f_fi2": "Feet & Inches Homework #2, Question #5"
  };

  return labelMap[code] || "Unknown item: " + code;
}
```

This uses the same idea as `dict.md`, but in a simple JavaScript format.

---

## 8) Result object pattern

Each query should return a simple object so the GUI can display it easily.

Example:

```javascript
{
  type: "tutor",
  title: "Missed questions for student 148",
  items: [
    { code: "3i_fi1", label: "Feet & Inches Homework #1, Question #3" },
    { code: "6i_fi1", label: "Feet & Inches Homework #1, Question #6" }
  ]
}
```

Another example:

```javascript
{
  type: "pair",
  title: "Paired students for GCP-20",
  pairs: [
    [231, 226],
    [223, 221],
    [237, 236]
  ]
}
```

And another:

```javascript
{
  type: "reteach",
  title: "Reteach priorities for BCP-180",
  items: [
    { code: "3i_fi1", total: 12, label: "Feet & Inches Homework #1, Question #3" },
    { code: "4f_fi1", total: 14, label: "Feet & Inches Homework #1, Question #4" }
  ]
}
```

This is exactly what the GUI can render.

---

## 9) The simplest possible project flow

Here is the beginner version of the full flow:

```javascript
const rows = loadCsvData(); // parse CSV into array of objects

const appState = {
  condition_1: "Student",
  condition_2: "sID",
  condition_3: 148
};

const result = runQuery(appState, rows);

console.log(result);
```

Then the GUI can do:

- if result.type === "tutor" → show a list
- if result.type === "pair" → show a table
- if result.type === "reteach" → show a ranked list

---

## 10) Best beginner rule

Do not try to write everything at once.

Build it in this order:

1. appState
2. runQuery
3. tutorQuery
4. pairQuery
5. reteachQuery
6. translateCodeToLabel
7. display result in the GUI

That keeps the work easy to debug and easy to edit.

