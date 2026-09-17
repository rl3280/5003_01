# Data Dictionary for scores.csv

#### NOTE: scores.csv is a BOOLEAN table that only records whether the student got the question right or wrong.  Comparing the student's answer to the answer key has already been checked, so no actual answers (numbers) exist in this table.

- First row is the header, with each column in the header row is a unique *field code*, for example, **1f_fi1**.
- Each subsequent row is a *student record*, indexed by the first column, **sID**.  Each **sID** is unique.
- The second field is the **class** field.  This field is does _not_ have unique identifiers, each value represents a *cohort*, one of several classes the teacher is responsible for, e.g., 'gcp-18'.
- A *math item* is all of the columns that end in the same suffix, e.g., the 16 columns following the **class** field all end in '_fi1', therefore those 16 fields consist of one *math item*.
- A *question* is the number at the beginning of a *field code*.  For example **2f_fi2** represents *question* #2 of the fi2 *math item*.

![BOOLEAN table layout](../img/data-dict.png)

<table>
<tr><th>header code</th><th>description</th></tr>
<tr><td>sID</td><td>Student's identification code.  No personal student information will be used in this app.</td></tr>
<tr><td>class</td><td>A unique idenfier for each of the teacher's classes.  For example, student 150 was in class bcp-177.</td></tr>
<tr><td>_fi1</td><td>Any header that ends in _fi1 is the first feet & inches assignment: adding and subtracting feet and inches.  The number in front of _fi1 indicates the problem number, and the 'f' or 'i' indicates the number of feet and inches of the student's answer for that question.  For example, 6i_fi1 means the number of inches the student answered to question 6.</td></tr>
<tr><td>_fi2</td><td>Any header that ends in _fi2 is the second feet & inches assignment: adding multiple lengths of feet and inches.  The number in front of _fi2 indicates the problem number, and the 'f' or 'i' indicates the number of feet and inches of the student's answer for that question.  For example, 3f_fi2 means the number of feet the student answered to question 3.</td></tr>
<tr><td>_fi3</td><td>Any header that ends in _fi3 is the third feet & inches assignment: spatial reasoning "find the missing side and perimeter," adding and subtracting feet and inches.  The number in front of _fi3 indicates the problem number, and the 'f' or 'i' indicates the number of feet and inches of the student's answer for that question.  For example, 5i_fi3 means the number of inches the student answered to question 5.</td></tr>
<tr><td>_r1</td><td>Any header that ends in _r1 is the first ruler fraction assignment: identifying a ruler measurement.  The number in front of _r1 indicates the problem number, and the 'w', 'n', and 'd' indicates the number of whole numbers, the numerator, and the denominator of the student's answer for that question.  For example, d02_r1 means the denominator the student answered to question 2.</td></tr>
<tr><td>_r2</td><td>Any header that ends in _r2 is the second ruler fraction assignment: adding and subtracting mixed numbers.  The number in front of _r2 indicates the problem number, and the 'w', 'n', and 'd' indicates the number of whole numbers, the numerator, and the denominator of the student's answer for that question.  For example, n07_r2 means the numerator the student answered to question 7.</td></tr>
<tr><td>_3a</td><td>Any header that ends in _3a is part 1 of the third ruler fraction assignment: calculating nail penetration.  The number in front of _3a indicates the problem number, and the 'w', 'n', and 'd' indicates the number of whole numbers, the numerator, and the denominator of the student's answer for that question.  For example, n07_3a means the numerator the student answered to question 7.</td></tr>
<tr><td>_3b</td><td>Any header that ends in _3b is part 2 of the third ruler fraction assignment: find the right screw bit.  The number in front of _3b is the problem number, and 'A' simply means answer.  For example, A11_3b means the student's answer for question 11.</td></tr>
</table>
