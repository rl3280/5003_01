Once the teacher clicks the GO button in the GUI, pass the 3 conditions to QUERY.

The conditions selected by the teacher in the GUI are passed here to determine how to filter, calculate and sort from <a href="dat/scores.csv">scores.csv</a>.

<table>
<tr><th>condition_1</th><th>condition_2</th><th>condition_3</th><th>query</th></tr>
<tr><td>student</td><td>sID</td><td>null</td><td>
   1. SELECT ONLY the sID record
   2. SELECT ONLY fields ending with _fi1 or _fi2 suffix AND
   3. RUN TUTOR QUERY</td></tr>
<tr><td>class</td><td>pair</td><td>cohort</td><td>
   1. SELECT ONLY records with class=cohort AND
   2. RUN PAIR QUERY</td></tr>
<tr><td>class</td><td>reteach</td><td>cohort</td><td>
   1. SELECT ONLY records with class=cohort
   2. SELECT ONLY fields ending with _fi1 or _fi2 suffix AND
   3. RUN RETEACH QUERY</td></tr>
</table>
<hr>

#### TUTOR QUERY

<query name="TUTOR">

   1. <step>LIST any *field code* with a FALSE value.</step>

   2. <step>Use <a href="dat/DICT.md">DICT.md</a> to translate the field codes into ordinary language.</step>

   <example>If **sID**=148 then generate the following list:
   - **3i_fi1** -> Feet & Inches Homework #1, Question #3
   - **6i_fi1** -> Feet & Inches Homework #1, Question #6
   - **1i_fi2** -> Feet & Inches Homework #2, Question #1
   - **4f_fi2** -> Feet & Inches Homework #2, Question #4
   - **5f_fi2** -> Feet & Inches Homework #2, Question #5
   
   </example>
</query>

<query name="PAIR">

   1. <step>COUNT all TRUE values for each *student record*.</step>
   2. <step>DELETE any *student record* from this query that has a total is LESS THAN 50.</step>
   3. <step>Create a two column array, where the first column starts with the **sID** with the highest TRUE total, the next **sID** with the second highest TRUE total, and so on.  
   The second column will start with the **sID** with the lowest TRUE total, the next **sID** with the second lowest TRUE total, and so on.

   <example>If **class**='GCP-20' then generate the following array:

   <table>
   <tr><td>231</td><td>226</td></tr>
   <tr><td>223</td><td>221</td></tr> 
   <tr><td>237</td><td>236</td></tr>
   <tr><td>220</td><td>235</td></tr>
   <tr><td>224</td><td>230</td></tr>
   <tr><td>227</td><td>225</td></tr>
   <tr><td>219</td><td>222</td></tr>
   <tr><td>232</td><td>233</td></tr>
   <tr><td>228</td><td>229</td></tr>
   </table>

   </example>
</query>

<query name="RETEACH">

   1. <step>COUNT all TRUE values in each *field code*.</step>
   2. <step>Create a list of the three lowest TRUE totals.</step>
   3. <step>Use <a href="dat/DICT.md">DICT.md</a> to translate the listed *field codes* into ordinary language.</step>
   
   <example>If **class**='BCP-180' then generate the following list:

   - **3i_fi1** -> Feet & Inches Homework #1, Question #3
   - **4f_fi1** -> Feet & Inches Homework #1, Question #4
   - **2f_fi2** -> Feet & Inches Homework #2, Question #2

   </example>
</query>

The query results are passed back to the right side of the GUI.
