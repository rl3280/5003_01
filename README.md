# 5003_01

<-- First assignment for Theory and Programming of Interactive Media -->
<objective>Trades Math Homework Assessment Analyst App</objective>
   <task id="instructor_swipes">Code a UI/UX that will afford a trades math instructor 3 choices
      <choice id="1">student/class</choice>
      <choice id="2">sID/class_code</choice> 
      <choice id="3">pair_share/reteach</choice>
   </task>
   <task id="in_class_activities">Given choices, [open] a .csv BOOLEAN table of assessed students' trades math homeworks
      <query id="filter">[filter out] all students not chosen</query>
      <query id="pair_and_share">[sort] selected students by total homework scores, and then, pair students, highest and lowest score, next highest and lowest, etc.</query>
      <query id="reteach">[sum] total math items scores of selected students, and [filter] lowest three summed math items</query>
   </task>
   <task id="individual_tutoring">Given choices, [open] a .csv BOOLEAN table of assessed students' trades math homeworks
      <query id="fi_rul">[sum] student's feet & inches answers, and [sum] student's ruler fraction answers. [Filter out] all student answers of the homework assignments of the higher sum.</query>
      <query id="answer_key">using sID, [open] and [echo] .pdf answer key for homework assignment with lowest score</query>
      <query id="math_item_generation">[open] .xls math item answer key, refresh formulas, and [echo] new math item question, not the answer</query>
   </task>
</objective>
