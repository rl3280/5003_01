#### Describe it

I to code a HTML, CSS and JS file to make an app that can pass a teacher's *swipes* and *clicks* into a query, and then filter, calculate and sort anonymized student homework assessments (<a href="dat/scores.csv">scores.csv</a>) and report back whichever of the three learning opportunities the teacher chooses to afford:
1. One-on-one remediation tutoring
2. In-class pair-and-share
3. Reteach

#### Prompt it
~~NOTE: Humans should read these files in 'Code', not "Preview." I used XML pseudo code to make it easier (?) for the cognitive agent to digest.~~ 
(*ed.* nope, not easier, see below)

- <a href="AGENT.md">AGENT.md</a> Objectives and Specifications for the AI tool.
- <a href="GUI.md">GUI.md</a> How the GUI should look and interact with the teacher to codify 3 conditions, which are passed to QUERY.
- <a href="QUERY.md">QUERY.md</a> Given the 3 conditions, run specified query of the assessed student homework, <a href="dat/scores.csv">scores.csv</a>
- <a href="DICT.md">DICT.md</a>  Help for the cognitive agent to translate (->) **field codes** in ordinary language when reporting back the results of the query.

#### Reflect on it

Before I had the agent generate the HTML, CSS and JS files, I had it read through my <a href="GUI.md">GUI.md</a> and <a href="QUERY.md">QUERY.md</a> and asked it to rewrite the files so to
1. use simple computations conepts and
2. organize the outputs

It loved me describing <a href="QUERY.md">QUERY.md</a> as a "deterministic tool."

It did a great job, identifying inconsistencies in my naming CSS containers (e.g., 'slider_1' in some places, 'top_slider' in others).

It didn't like the <XML> pseudocode though.  Maybe it's because I'm using CoPilot.
It also didn't like my <HTML> tags.  But making tables, which I have been doing ever since reading <a href="https://www.amazon.com/-/es/Laura-Lemay/dp/1575210967">Laura Lemay's HTML 3.2</a>, I know how to do well, and I'd like to think the agent could easily reformat.

More importantly, it laid out a very clear template for me to use when writing the steps to produce the GUI, including.
1. defining single app state steps, a "small state machine."  I don't know what that means.
2. drop down menu behavior
3. validation logic
4. a render function (I have no idea what that means)
5. an event model (ditto)
6. an implementation order (see above)

It also said, "Do not scatter state into many different DOM checks."  Again, I don't know what this means, so I have to reiterate my "simple and organize" rule.

The same thing for QUERY.  This is where the JS lies, which I really know nothing about, so I asked it to make a beginner-friendly JavaScript outline (<a href="JS_outline.md">JS_outline</a>).

I'm totally lost reading it, but my agent ended by saying,

This is a perfect beginner JavaScript project because:

- the logic is deterministic
- the decisions are simple
each query has one clear purpose
- the output is easy to display

So I felt better.

Then I shut it down, and spooled up a new chat, the first prompt is at the bottom of <a href="chat.md">chat.md</a>
 
Then <a href="the_whole_enchilada.md">the_whole_enchilada</a>.
 