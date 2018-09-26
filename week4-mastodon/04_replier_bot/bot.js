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

// Making a Mastodon object for connection to the API
var M = new Mastodon(config);

// Setting up a user stream
// Streaming API: https://github.com/tootsuite/documentation/blob/master/Using-the-API/Streaming-API.md
const stream = M.stream('streaming/user')

stream.on('message', event => {
  const data = event.data;
  if (data.type === 'follow') {
    console.log(`${data.account.username} followed you!`);
  } else if (data.type === 'mention') {

    const user_id = data.account.id;
    const username = data.account.username;
    const status_id = data.status.id;
    const content = data.status.content;

    const toot = {
      in_reply_to_id: status_id,
      in_reply_to_account_id: user_id,
      status: `@${username} Thanks for the mention!`
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
});