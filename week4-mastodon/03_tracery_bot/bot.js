// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using a Mastodon node package
// https://github.com/vanita5/mastodon-api

var Mastodon = require('mastodon-api');

// Authorization for the bot
// https://mastodon.social/oauth/authorized_applications
var config = require('./config.js');

// Making a Twit object for connection to the API
var M = new Mastodon(config);

// Here is all the generative text code
// Tracery: https://github.com/galaxykate/tracery
// Tutorial: http://www.crystalcodepalace.com/traceryTut.html
// Make a grammar: http://www.brightspiral.com/tracery/

var tracery = require('tracery-grammar');

var data = {
  "sentence": ["#color.capitalize# #animal.s# are #often# #mood#.",
    "#animal.a.capitalize# is #often# #mood#, unless it is #color.a# one."
  ],
  "often": ["rarely", "never", "often", "almost always", "always", "sometimes"],
  "color": ["orange", "blue", "white", "black", "grey", "purple", "indigo", "turquoise"],
  "animal": ["unicorn", "raven", "sparrow", "scorpion", "coyote", "eagle", "owl", "lizard", "zebra", "duck", "kitten"],
  "mood": ["vexed", "indignant", "impassioned", "wistful", "astute", "courteous"],
};

var grammar = tracery.createGrammar(data);
grammar.addModifiers(tracery.baseEngModifiers);

function generate() {
  var status = grammar.flatten('#sentence#');
  return status;
}

// Start once
tooter();

// Once every N milliseconds
setInterval(tooter, 60 * 5 * 1000);

// Here is the bot!
function tooter() {

  const toot = {
    status: generate()
  }

  // Post that tweet!
  M.post('statuses', toot, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data.content);
    }
  });
}