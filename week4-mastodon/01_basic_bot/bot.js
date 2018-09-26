// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using the Mastodon node package
// https://github.com/vanita5/mastodon-api

var Mastodon = require('mastodon-api');

// Authorization for the bot
// https://botsin.space/oauth/authorized_applications
var config = require('./config.js');

// Making a Twit object for connection to the API
var M = new Mastodon(config);

// Start once
tooter();

// Once every N milliseconds
setInterval(tooter, 60 * 5 * 1000);

// Here is the bot!
function tooter() {

  // This is a random number bot
  const toot = {
    status: 'Here\'s a random number between 0 and 100: ' + Math.floor(Math.random() * 100)
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