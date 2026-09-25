#### Describe it
<hr>
Trades math journeypersons spend almost all of our clocked time with our apprentices, joined at the hip, on the worksite.  We generate a lot of assessed data alongside our apprentices.  Unfortunately, formatting the data for program manager reports is the edge of our horizons—using it to better serve our apprentices simply is a non-starter.  After that report is filed, time to recharge and get ready for the next crew.  

I want to code a HTML, CSS and JS file to make an app that can pass a teacher's *swipes* and *clicks* into a query, and then filter, calculate and sort anonymized student homework assessments (<a href="dat/scores.csv">scores.csv</a>) and report back whichever of the three learning opportunities the journeyperson chooses to afford:
1. One-on-one remediation tutoring
2. In-class pair-and-share
3. Reteach

#### Prompt it
<hr>
~~NOTE: Humans should read these files in 'Code', not "Preview." I used XML pseudo code to make it easier (?) for the cognitive agent to digest.~~ 
(*ed.* nope, not easier, see below)

- <a href="AGENT.md">AGENT.md</a> Objectives and Specifications for the AI tool.
- <a href="GUI.md">GUI.md</a> How the GUI should look and interact with the teacher to codify 3 conditions, which are passed to QUERY.
- <a href="QUERY.md">QUERY.md</a> Given the 3 conditions, run specified query of the assessed student homework, <a href="dat/scores.csv">scores.csv</a>
- <a href="DICT.md">DICT.md</a>  Help for the cognitive agent to translate (->) **field codes** in ordinary language when reporting back the results of the query.

#### Reflect on it
<hr>
Before I had the agent generate the HTML, CSS and JS files, I had it read through my <a href="GUI.md">GUI.md</a> and <a href="QUERY.md">QUERY.md</a> and asked it to rewrite the files so to
1. use simple computations concepts and
2. organize the outputs

It loved me describing <a href="QUERY.md">QUERY.md</a> as a "deterministic tool."

It did a great job, identifying inconsistencies in my naming CSS containers (e.g., 'slider_1' in some places, 'top_slider' in others).

It didn't like the <XML> pseudocode though.  Maybe it's because I'm using CoPilot.

It also didn't like my <HTML> tags.  But making tables, which I have been doing ever since reading <a href="https://www.amazon.com/-/es/Laura-Lemay/dp/1575210967" target="_blank">Laura Lemay's HTML 3.2</a>, I know how to do well, and I'd like to think the agent could easily reformat.  Compare [diff] between <a href="QUERY.md">QUERY.md</a> and <a href="QUERY_bak.md">QUERY_bak.md</a>

I don't know if it appreciated my <a href="/img/">png mockups of the GUI</a>, but at least I'm in a better place for the <a href="https://github.com/rl3280/5003_02">next activity</a>.

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
- each query has one clear purpose
- the output is easy to display

So I felt better.

Then I shut it down, and spooled up a new chat.  The first prompt is at the bottom of <a href="chat.md">chat.md</a>
 
And then, <a href="the_whole_enchilada.md">the_whole_enchilada</a>.
 
 *postscript*

 **Right the first time**  Growing up in the '80's, the last time we still manufactured, this was a buzz word I remember hearing my father say when he was talking with his Product Design collaborators at <a href="https://www.armstrong.com">Armstrong World Industries.</a>  There's something satisfying about connecting all the pieces, with trepidation flip the switch, and, maybe miraculously, seeing it light up just like you imagined. EUREKA!

 Well, not quite.  I wanted a semitransparent yellow slider to swipe left/right.  The yellow stayed, but only buttons.  Why?

 I know we're supposed to design our agents to afford us easy entry into learning about the code.  

 And I did generate a <a href="JS_outline.md">JS_outline</a> and cut-and-pasted a <a href="chat.md">chat log</a>.

 But, and this was the design intent of this app, for me, simply getting to this point, just like the trades math journeyman, who, after generating the reports for the Program Manager of the Apprenticeship Program, (<a href="dat/scores.csv">scores.csv</a>), leaves me spent.  Need to switch to *recharge mode*.

 So back to the semitransparent yellow sliders.  Yes, I could go back now and iterate/chat to get what I initially wanted, learning some code along the way, but both me and the trades math journeyman are tired now, we gave it our best, we did achieve something, and that's enough for now, we'll get 'em next year.

And besides, upon reflection, the audience I designed this tool for really don't care if it's fancy slider or a simple button.  Doing so simplified the paths for the user to select 3 conditions for the .js to query in the .csv.

**PLEASE NOTE:** the actual product is buried in the /gen folder.

> You can see the final product at the <a href="ubercrawl.net">ubercrawl</a>