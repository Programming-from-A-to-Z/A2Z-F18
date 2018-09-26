// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using the Mastodon node package
// https://github.com/vanita5/mastodon-api

var Mastodon = require('mastodon-api');
var fs = require('fs');

// Authorization for the bot
// https://mastodon.social/oauth/authorized_applications
var config = require('./config.js');

// Making a Twit object for connection to the API
var M = new Mastodon(config);

// Setting up a user stream
// Streaming API: https://github.com/tootsuite/documentation/blob/master/Using-the-API/Streaming-API.md
const stream = M.stream('streaming/user')


stream.on('message', msg => {

  // For debugging
  // fs.writeFileSync(`data${new Date().getTime()}.json`, JSON.stringify(msg, null, 2));

  // Only interacting with messages that specifically mention me!
  if (msg.event === 'notification' && msg.data.type === 'mention') {
    const status = msg.data.status;
    console.log('a mention!');

    let regex = /(favorite|like|❤️)/i;
    if (regex.test(status.content)) {
      console.log('Attempting to favorite ' + status.id + ": " + status.content);
      // Favorite
      M.post(`statuses/${status.id}/favourite`, (error, success) => {
        if (error) console.error(error);
        else if (success) console.log('Favorited!');
      });
    }

    regex = /(boost|reblog|retweet|🦄)/i;
    if (regex.test(status.content)) {
      // Reblog
      console.log('Attempting to reblog ' + status.id + ": " + status.content);
      M.post(`statuses/${status.id}/reblog`, (error, success) => {
        if (error) console.error(error);
        else if (success) console.log('Reblogged!');
      });
    }

  }
});

stream.on('error', (err) => {
  console.log(err);
})

// stream.on('heartbeat', (msg) => {
//   console.log('thump.');
// })