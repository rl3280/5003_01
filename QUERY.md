Once the teacher clicks the GO button in the GUI, the app sends 3 state conditions to the query engine.

These 3 conditions are:

- condition_1: Student or Class
- condition_2: sID, Pair, or Reteach
- condition_3: cohort value or selected student value

The query engine then uses these conditions to filter, count, sort, and translate data from `scores.csv`.

The purpose is simple:

- Student + sID → look at one student’s missed questions
- Class + Pair + cohort → pair students by skill level
- Class + Reteach + cohort → find the class questions that need reteaching

---

## 1) Decision table

This is the full logic map:

| condition_1 | condition_2 | condition_3 | Query to run |
|---|---|---|---|
| Student | sID | selected student | TUTOR |
| Class | Pair | cohort | PAIR |
| Class | Reteach | cohort | RETEACH |

### Rule
Only these 3 combinations are valid.

If the teacher chooses a different combination, the GUI should not allow GO to work.

---

## 2) Query 1: TUTOR

### Trigger
- condition_1 = Student
- condition_2 = sID

### What the query does
1. Select only the row where sID matches the chosen student.
2. Keep only fields that end with _fi1 or _fi2.
3. Find every field code with a FALSE value.
4. Use `dict.md` to translate each field code into plain teacher language.

### Goal
This query answers:

> Which questions did this student miss?

### Output format
A simple list of missed items.

### Example
If the selected student is 148, the result might look like this:

- 3i_fi1 → Feet & Inches Homework #1, Question #3
- 6i_fi1 → Feet & Inches Homework #1, Question #6
- 1i_fi2 → Feet & Inches Homework #2, Question #1
- 4f_fi2 → Feet & Inches Homework #2, Question #4
- 5f_fi2 → Feet & Inches Homework #2, Question #5

### Important note
The table is Boolean, so each field is either:

- TRUE = correct
- FALSE = incorrect

The tutor query is looking for all FALSE values.

---

## 3) Query 2: PAIR

### Trigger
- condition_1 = Class
- condition_2 = Pair
- condition_3 = cohort

### What the query does
1. Select only records where class = chosen cohort.
2. Count all TRUE values for each student row.
3. Remove any student whose total TRUE count is less than 50.
4. Sort students by score.
5. Build a two-column pairing table:
   - left column = highest totals from high to low
   - right column = lowest totals from low to high

### Goal
This query answers:

> Which students should be paired together for balanced comparison?

### Output format
A two-column table of sIDs.

### Example
If the selected class is GCP-20, the output might look like this:

- 231 | 226
- 223 | 221
- 237 | 236
- 220 | 235
- 224 | 230
- 227 | 225
- 219 | 222
- 232 | 233
- 228 | 229

### Simple way to think about it
This is not random. It is a ranking system:

- top students go on the left
- lower students go on the right
- matching creates balanced pairs

---

## 4) Query 3: RETEACH

### Trigger
- condition_1 = Class
- condition_2 = Reteach
- condition_3 = cohort

### What the query does
1. Select only records where class = chosen cohort.
2. Keep only fields that end with _fi1 or _fi2.
3. Count all TRUE values for each field code.
4. Pick the 3 field codes with the lowest TRUE totals.
5. Use `dict.md` to translate those field codes into plain language.

### Goal
This query answers:

> Which class-wide skills need reteaching?

### Output format
A short list of the lowest-performing math items or questions.

### Example
If the selected class is BCP-180, the result might look like this:

- 3i_fi1 → Feet & Inches Homework #1, Question #3
- 4f_fi1 → Feet & Inches Homework #1, Question #4
- 2f_fi2 → Feet & Inches Homework #2, Question #2

### Simple way to think about it
This query identifies the problems that were least often answered correctly across the class.

---

## 5) Data source rules

The query engine reads from `scores.csv`, which is a Boolean table.

Important rules:

- first row is the header
- each column name is a field code
- the first field is sID
- the second field is class
- every row after that is one student record
- each value is TRUE or FALSE

The data dictionary in `dict.md` explains what each field code means in teacher language.

---

## 6) Output to the GUI

After the query runs, the result is passed back to the right side of the GUI.

The GUI only needs to display the result from the selected query:

- TUTOR → list of missed questions for one student
- PAIR → paired student list for a class
- RETEACH → priority reteach items for a class

---

## 7) Summary in plain English

The logic is deterministic:

- If the teacher chooses Student and a student ID, run the TUTOR query.
- If the teacher chooses Class and Pair and a cohort, run the PAIR query.
- If the teacher chooses Class and Reteach and a cohort, run the RETEACH query.

Each query:
- filters the dataset
- counts, sorts, or checks values
- returns a result in a simple, display-ready format

This is the clean connection between the GUI state and the data queries.