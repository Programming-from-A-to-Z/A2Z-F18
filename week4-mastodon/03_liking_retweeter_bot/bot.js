// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using the Mastodon node package
// https://github.com/vanita5/mastodon-api

var Mastodon = require('mastodon-api');

// Authorization for the bot
// https://mastodon.social/oauth/authorized_applications
var config = require('./config.js');

// Making a Twit object for connection to the API
var M = new Mastodon(config);

// Streaming API: https://github.com/tootsuite/documentation/blob/master/Using-the-API/Streaming-API.md
const stream = M.stream('streaming/public');

stream.on('message', toot => {
  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs');
  // var json = JSON.stringify(data, null, 2);
  // fs.writeFile("toot.json", json, () => console.log('writing file'));

  var regex = /(rainbow|🌈|unicorn|🦄)/i;
  const data = toot.data;
  // console.log(data.id);

  if (regex.test(data.content)) {
    console.log('Attempting to boost ' + data.id + ": " + data.content);

    // Reblog
    M.post(`statuses/${data.id}/reblog`, (error, success) => {
      if (error) console.error(error);
      else if (success) console.log('Reblogged!');
    });

    // Favorite
    M.post(`statuses/${data.id}/favourite`, (error, success) => {
      if (error) console.error(error);
      else if (success) console.log('Favorited!');
    });
  }
});

stream.on('error', (err) => {
  console.log(err);
})

// stream.on('heartbeat', (msg) => {
//   console.log('thump.');
// })