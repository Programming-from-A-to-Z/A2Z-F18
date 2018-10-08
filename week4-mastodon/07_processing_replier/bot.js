// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using the Mastodon node package
// https://github.com/vanita5/mastodon-api

require('dotenv').config();
const Mastodon = require('mastodon-api');
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

console.log("Mastodon Bot starting...");

const M = new Mastodon({
  client_key: process.env.CLIENT_KEY,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  api_url: 'https://botsin.space/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
})

const cmd = 'processing-java --sketch=`pwd`/treegen --run';

const stream = M.stream('streaming/user');

stream.on('message', response => {
  if (response.event === 'notification' && response.data.type === 'mention') {
    const id = response.data.status.id;
    const acct = response.data.account.acct;
    const content = response.data.status.content;

    // Get the first Number
    const results = content.match(/\d+((\.|\,)\d+)?/);
    let angle = results ? results[0] : -1;

    toot(acct, id, angle)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }
});

async function toot(acct, reply_id, angle) {
  if (angle === -1) {
    const params = {
      status: `@${acct} Please specify an angle in degrees using digits.`,
      in_reply_to_id: reply_id
    }
    await M.post('statuses', params)
    return {
      success: true,
      angle: -1
    };
  } else {
    // Step 1: Get generate image with specified angle
    await exec(cmd + ' ' + angle);
    const stream = fs.createReadStream('treegen/tree.png');

    // Step 2: Upload Media
    const uploadParams = {
      file: stream,
      description: `A randomly generated fractal tree with ${angle} degrees.`
    }
    const uploadResponse = await M.post('media', uploadParams);
    const mediaId = uploadResponse.data.id;

    // Step 3: Toot with image attached
    const tootParams = {
      status: `@${acct} Behold my beautiful tree with angle ${angle} degrees`,
      in_reply_to_id: reply_id,
      media_ids: [mediaId]
    }

    await M.post('statuses', tootParams)
    return {
      success: true,
      angle: angle
    };
  }
}