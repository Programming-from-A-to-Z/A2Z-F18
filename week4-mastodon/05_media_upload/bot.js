// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using the Mastodon node package
// https://github.com/vanita5/mastodon-api

const Mastodon = require('mastodon-api');
const fs = require('fs');

// Authorization for the bot
// https://botsin.space/oauth/authorized_applications
const config = require('./config.js');

// Making a Twit object for connection to the API
const M = new Mastodon(config);

const params = {
  file: fs.createReadStream('walk.png'),
  description: 'an image of a random walk'
}

M.post('media', params)
  .then(response => {
    console.log('image uploaded');
    const id = response.data.id;
    const toot = {
      status: 'random walk',
      media_ids: [id]
    };
    return M.post('statuses', toot)
  })
  .then(response => {
    console.log('Success:' + response.data.content);
  })
  .catch(error => console.error(error));