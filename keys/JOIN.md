Once the teacher clicks the GO button, pass the conditions expressed by the selections the teacher made with the sliders and dropdown menus to JOIN.

The conditions selected by the teacher in UIUX are passed here to determine how to filter and calculate from the scores.csv BOOLEAN table.

<table>
<tr><th>condition_1</th><th>condition_2</th><th>condition_3</th><th>BOOLEAN query</th></tr>
<tr><td>student</td><td>sID</td><td>null</td><td>SELECT only the sID record, and run query_1</td></tr>
<tr><td>class</td><td>pair</td><td>cohort</td><td>SELECT only records with class=cohort, and run query_2</td></tr>
<tr><td>class</td><td>reteach</td><td>cohort</td><td>SELECT only records with class=cohort, and run query_3</td></tr>
</table>

<query id="1">
   <step>LIST any math item field name with a FALSE value.</step>
   <step>Use DATA.md to translate the listed field codes into ordinary language.</step>
   <example>If sID=### then generate the following list:
   
   </example>
</query>

<query id="2">
   <step>TOTAL all TRUE values for each record</step>
   <step>DELETE any record from this query that total is LESS THAN 10</step>
   <step>create a two column array, where the first column starts with the sID with the highest TRUE total, the next sID with the second highest TRUE total, and so on.  
   The second column will start with the sID with the lowest TRUE total, the next sID with the second lowest TRUE total, and so on.</query>
   <example>If class='GCP-20' then generate the following array:

   </example>
</query>

<query id="3">
   <step>TOTAL all TRUE values in each field</step>
   <step>create a list of the three lowest TRUE total</step>
   <step>Use DATA.md to translate the listed field codes into ordinary language.</step>
   <example>If class='BCP-180' then generate the following list:

   </example>

The query results are passed back to the right side of the GUI.
