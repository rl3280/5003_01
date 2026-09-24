#### Describe it

I want my AI tool to code a HTML, CSS and JS file to make an app that can pass a teacher's *swipes* and *clicks* into a query, and then filter, calculate and sort anonymized student homework assessments (<a href="dat/scores.csv">scores.csv</a>) and report back whichever of the three learning opportunities the teacher chooses to afford:
1. One-on-one remediation tutoring
2. In-class pair-and-share
3. Reteach

#### Prompt it

- <a href="AGENT.md">AGENT.md</a> Objectives and Specifications for the AI tool.
- <a href="GUI.md">GUI.md</a> How the GUI should look and interact with the teacher to codify 3 conditions, which are passed to QUERY.
- <a href="QUERY.md">QUERY.md</a> Given the 3 conditions, run specified query of the assessed student homework, <a href="dat/scores.csv">scores.csv</a>
- <a href="DICT.md">DICT.md</a>  Help for the cognitive agent to translate (->) **field codes** in ordinary language when reporting back the results of the query.

#### Reflect on it

Before I had the agent generate the HTML, CSS and JS files, I had it read through my <a href="QUERY.md">QUERY.md</a> and <a href="QUERY.md">QUERY.md</a> and asked it to rewrite the files so to
1. use simple computations conepts and
2. organize the outputs

It did a great job, identifying inconsistencies in my naming CSS containers (e.g., 'slider_1' in some places, 'top_slider' in others).

More importantly, it laid out a very clear template for me to use when writing the steps to produce the GUI, including.
1. defining single app state steps, a "small state machine."  I don't know what that means.
2. drop down menu behavior
3. validation logic
4. a render function (I have no idea what that means)
5. an event model
6. an implementation order

It also said, "Do not scatter state into many different DOM checks."  Again, I don't know what this means, so I have to reiterate my "simple and organize" rule.