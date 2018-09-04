# Programming from A to Z, Fall 2018

This course focuses on programming strategies and techniques behind procedural analysis and generation of text-based data. We'll explore topics ranging from evaluating text according to its statistical properties to the automated production of text with probabilistic methods to text visualization. Students will learn server-side and client-side JavaScript programming and develop projects that can be shared and interacted with online.  There will be weekly homework assignments as well as a final project.

## Info
- Daniel Shiffman, Tuesdays, 12:10pm-2:40pm
- [All class dates](http://help.itp.nyu.edu/curriculum/fall-class-dates)
- [Office Hours](https://itp.nyu.edu/inwiki/Signup/Shiffman)

## Mailing List
* [Join ITP A2Z Google Group](https://groups.google.com/a/nyu.edu/forum/#!forum/a2z-group/).

## Week 1 - Intro
* [Notes and Examples](http://shiffman.net/a2z/intro/)
* [Glitch Example](https://glitch.com/edit/#!/a2z-diastic)  
* Git, GitHub, GitHub pages
* DOM manipulation in p5.js
* Strings in JS
* Text input (from user, from file)
* Client-side vs. Server-side programming
* Workflow videos:
    * [p5.js Workflow with Atom, p5 manager, and http-server](https://youtu.be/HZ4D3wDRaec)
    * [Sublime Text and Python Server](https://www.youtube.com/watch?v=UCHzlUiDD10)
    * [Atom and Node Server](https://www.youtube.com/watch?v=d3OcFexe9Ik)
* [Homework Assignment](https://github.com/shiffman/A2Z-F18/wiki/Week-1-Homework)

## Week 2 -- Regular Expressions
* [Notes and Examples](http://shiffman.net/a2z/regex/)
* Also
  * multiple DOMs + multiple event
  * rita.js -- similar and rhyming, etc.
* Regular Expressions
  * meta-characters
    * position
    * single character
    * quantifiers
    * character classes
    * alternation
    * capturing groups and back reference
  * Regex in atom editor
  * Regex in JS:
      * Regex: `test()`, `exec()`
      * String: `match()`
  * Splitting with regex: `split()`
  * Replace with regex: `replace()`
  * [randexp.js](http://fent.github.io/randexp.js/)
* [Homework Assignment](https://github.com/shiffman/A2Z-F18/wiki/Week-2-Homework)

## Week 3 -- Data/API Workshop
* [Notes and Examples](http://shiffman.net/a2z/data-apis/)
* JSON basics
  * [Corpora maintained by tinysubversions](https://github.com/dariusk/corpora)
* JavaScript libraries
  * [rita.js](https://github.com/dhowe/RiTaJS)
  * [nlp-compromise](https://github.com/nlp-compromise/nlp_compromise)
* Getting data from APIs
  * [wordnik](http://developer.wordnik.com/)
  * [nytimes api](https://developer.nytimes.com/)
  * [wikipedia api](https://en.wikipedia.org/w/api.php)
* Working with google sheets: [tabletop.js](https://github.com/jsoma/tabletop)
* [Homework Assignment](https://github.com/shiffman/A2Z-F18/wiki/Week-3-Homework)

## Week 4 -- Bots! Bots! Bots!
* [ChatBot Slides](https://docs.google.com/presentation/d/1NCeg8WJnH2RFU-VTMpYCffPGHkFRDAoED4LwK6affvI/edit?usp=sharing)
* [TwitterBot Slides](https://docs.google.com/presentation/d/1rL95AggCb0EG6sBhZ47OWWgI_t7Hllqbyt4AnD2c3-4/edit?usp=sharing)
* [Notes on Node](http://shiffman.net/a2z/server-node/)
* [Notes on Twitter Bots](http://shiffman.net/a2z/twitter-bots/)
   * [Notes on deploy to heroku](http://shiffman.net/a2z/bot-heroku/)
   * [Notes on deploy to amazon ec2](http://shiffman.net/a2z/bot-ec2/)
* ChatBots
   * [RiveScript](https://www.rivescript.com/)
   * [RiveScript video tutorial](https://www.youtube.com/watch?v=wf8w1BJb9Xc)
   * [RiveScript + p5.js video tutorial](https://www.youtube.com/watch?v=zGe1m_bLOFk)
* Voice Synthesis and Speech Recognition
   * [p5.Speech from Ability Project](http://ability.nyu.edu/p5.js-speech/)
* Reading and References
  * [12 Weird, Excellent Twitter Bots Chosen by Twitter’s Best Bot-Makers](http://nymag.com/following/2015/11/12-weirdest-funniest-smartest-twitter-bots.html)
  * [Some Strategies of Bot Poetics](https://harrygiles.org/2016/04/06/some-strategies-of-bot-poetics/)
  * [How to Make a Bot That Isn't Racist](http://motherboard.vice.com/read/how-to-make-a-not-racist-bot
  )
  * [Queer Your Bots: The Bot Builder Roundtable](http://www.autostraddle.com/queer-your-bots-the-bot-builder-roundtable-333806/)
  * [Twitter: Automation rules and best practices](https://support.twitter.com/articles/76915)
* [Homework Assignment](https://github.com/shiffman/A2Z-F18/wiki/Bot-Project)

## Week 5 - Text Analysis Workshop
* [Notes on text analysis](http://shiffman.net/a2z/text-analysis/)
* In class, we'll build a simple concordance together as well as demonstrate and discuss TF/IDF, Bayesian analysis, and word2vec.
* Simple Concordance
* TF/IDF
* [Bayesian Classification Library](https://github.com/shiffman/bayes-classifier-js)
* Node text analysis packages

## Week 6 - Show Bots

## Week 7 - Text Generation: Markov Chains and Grammars
* [Notes on N-Grams and Markov Chains](http://shiffman.net/a2z/markov)
* What is an N-Gram?
* What is Markov Chain?
  * order
  * source text and output design
  * char vs. word n-grams
  * client-side vs. server-side generation
* Grammars
  * [Notes on Context-Free Grammar](http://shiffman.net/a2z/cfg)
  * [Tracery by Kate Compton](http://tracery.io/)
* [Homework Assignment](https://github.com/shiffman/A2Z-F18/wiki/Week-7-Homework)

## Week 8 - Maching Learning: word2vec, LSTMs 
* Word2Vec
    * [Allison Parrish Word2Vec Tutorial](https://gist.github.com/aparrish/2f562e3737544cf29aaf1af30362f469)
* [Homework Assignment](https://github.com/shiffman/A2Z-F18/wiki/Week-8-Homework)

## Week 9 - Building your own API in Node
* [Notes on Node](http://shiffman.net/a2z/server-node/)
* [Notes on API in Node](http://shiffman.net/a2z/node-api/)
* [Notes on Firebase](http://shiffman.net/a2z/firebase)
* Express
  * serving files
* data persistence
  * local json files, databases?
  * [Firebase](https://firebase.google.com/)
* html scraping, request package
* routes
  * query string vs. "RESTian"
  * CORS
  * sending back JSON
* Text APIs
  * Your own API (concordance, markov, etc.)
  * AFINN-111 sentiment analysis ([sentiment node package](https://github.com/thisandagain/sentiment))
  * spellcheck (with [node natural](https://github.com/NaturalNode/natural))
  * Bayesian text classification (with [node natural](https://github.com/NaturalNode/natural))

## Week 10 - Chrome Extensions
* [Notes on chrome extensions](http://shiffman.net/a2z/chrome-ext/)

## Week 11 - Final Project Proposals part 1
* [Proposal links and schedule](https://github.com/shiffman/A2Z-F18/wiki/Final-Project-Proposals)

## Week 12 - Final Project Proposals part 2
* [Proposal links and schedule](https://github.com/shiffman/A2Z-F18/wiki/Final-Project-Proposals)

## Week 13 - [User Testing](https://github.com/shiffman/A2Z-F18/wiki/User-Testing)

## Week 14 - Final Presentations

## References and Inspiration
* Moved to [references wiki](https://github.com/shiffman/A2Z-F18/wiki/References)

## Tools
* [p5.js](http://p5js.org)
* [p5.js on GitHub](https://github.com/processing/p5.js)
* [p5.js CDN](http://cdnjs.com/libraries/p5.js)
* [Node](http://nodejs.org/)
* [RitaJS](https://github.com/dhowe/RiTaJS)

## JS reference books
* [JavaScript: The Definitive Guide](http://shop.oreilly.com/product/9780596000486.do)
* [Eloquent JavaScript](http://eloquentjavascript.net/contents.html), Marijn Haverbeke
* [Beginning JavaScript](http://www.amazon.com/Beginning-JavaScript-Paul-Wilton/dp/0470525932), Paul Wilton and Jeremy McPeak

## Learning / Intro
* [CodeAcademy: JavaScript](http://www.codecademy.com/tracks/javascript)
* [How to learn JavaScript properly](http://javascriptissexy.com/how-to-learn-javascript-properly/)
* [JavaScript the right way](http://www.jstherightway.org/)
* [Code School](https://www.codeschool.com/paths/javascript)
* [JavaScript garden](http://bonsaiden.github.io/JavaScript-Garden/)
* [A re-introduction to JS by Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
* [JavaScript 101 from JQuery](https://learn.jquery.com/javascript-101/)

## Tools
* Checking code: [JSLint](http://www.jslint.com/) / [JSHint](http://www.jshint.com)
* Browser debugging: Chrome Developer Tools ([tutorial](https://developer.chrome.com/extensions/tut_debugging)) / Firebug ([tutorial](http://www.developerfusion.com/article/139949/debugging-javascript-with-firebug/))
* Mobile debugging [jsconsole.com](http://jsconsole.com)
* Sharing code snippets (useful for asking questions): [gist.github.com](http://gist.github.com)

## Requirements
* You are required to attend all class meetings and submit all weekly assignments and a final project.
* Grading (pass/fail) will be based on a combination of factors:
  * Attendance, participation in class discussion, and engagement in other students' projects (25%)
  * Quality of assignments (50%)
  * Final Project (25%)