// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using the Mastodon node package
// https://github.com/vanita5/mastodon-api

const Mastodon = require('mastodon-api');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


// Authorization for the bot
// https://botsin.space/oauth/authorized_applications
const config = require('./config.js');

// Making a Twit object for connection to the API
const M = new Mastodon(config);

// Here is the command to run the Processing sketch
// You need to have Processing command line installed
// See: https://github.com/processing/processing/wiki/Command-Line
const cmd = 'processing-java --sketch=`pwd`/randomwalk/ --run';

console.log('The bot is starting');

// Start once
tooter();

// Once every N milliseconds
setInterval(tooter, 60 * 5 * 1000);

function tooter() {
  toot().
  then(response => {
    console.log(`Success: ${response.id} ${response.timestamp}`);
  }).
  catch(error => console.log(error));
}


async function toot() {
  // Step 1: Run Processing
  const response1 = await exec(cmd);
  console.log(response1.stdout);

  // Step 2: Post media
  const stream = fs.createReadStream('randomwalk/output.png');
  const media = {
    file: stream,
    description: 'An image of a random walk.'
  };
  const response2 = await M.post('media', media);

  // Step 3: Post status
  const toot = {
    status: 'I walked randomly',
    media_ids: [response2.data.id]
  }
  const response3 = await M.post('statuses', toot);

  // Report that I am done
  console.log("Success!");
  console.log(`id: ${response3.data.id} at ${response3.data.created_at}`);
  return {
    id: response2.data.id,
    timestamp: response3.data.created_at
  };
}