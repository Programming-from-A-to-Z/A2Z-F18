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

// Making a Mastodon object for connection to the API
var M = new Mastodon(config);

// Setting up a user stream
// Streaming API: https://github.com/tootsuite/documentation/blob/master/Using-the-API/Streaming-API.md
const stream = M.stream('streaming/user')


stream.on('message', msg => {

  // For debugging
  fs.writeFileSync(`data${new Date().getTime()}.json`, JSON.stringify(msg, null, 2));

  // Only interacting with notifications
  if (msg.event === 'notification') {

    const data = msg.data;
    // New followers
    if (data.type === 'follow') {
      console.log(`${data.account.username} followed you!`);
      const toot = {
        status: `@${data.account.acct} thanks for the follow!`
      }
      // Post that tweet!
      M.post('statuses', toot, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data.content);
        }
      });
      // Mentions
    } else if (data.type === 'mention') {

      const user_id = data.account.id;
      const username = data.account.username;
      const acct = data.account.acct;
      const status_id = data.status.id;
      const content = data.status.content;
      console.log(`${username} mentioned you!`);

      // removing all html tags
      console.log(content);
      const cleaned = content.replace(/<.*?>/g, '');
      console.log(cleaned);
      // Reversing the characters
      let reverse = '';
      for (let i = cleaned.length - 1; i >= 0; i--) {
        reverse += cleaned.charAt(i);
      }

      const toot = {
        in_reply_to_id: status_id,
        in_reply_to_account_id: user_id,
        status: `@${acct} ${reverse}`
      }
      console.log(toot);

      // Post that tweet!
      M.post('statuses', toot, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data.content);
        }
      });

    }
  }
});