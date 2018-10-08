console.log('The bot is starting');

const config = require('./config.js');
const Mastodon = require('mastodon-api');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const M = new Mastodon(config);
const cmd = 'processing-java --sketch=/Users/a2z/Documents/mastodon_examples/mastodon3/squares --run';

toot().
  then(response => {
    console.log(response);
  }).
  catch(error => console.log(error));


async function toot() {
  // Step 1: Run Processing
  const response1 = await exec(cmd);
  console.log(response1.stdout);

  // Step 2: Post media
  const stream = fs.createReadStream('squares/output.png');
  const media = {
    file: stream,
    description: 'A square image of random grey squares.'
  };
  const response2 = await M.post('media', media);

  // Step 3: Post status
  const toot = {
    status: 'Squares!',
    media_ids: [response2.data.id]
  }
  const response3 = await M.post('statuses', toot);

  // Report that I am done
  console.log("Success!");
  console.log(`id: ${response3.data.id} at ${response3.data.created_at}`);
  return {
    image: 'output.png',
    id: response2.data.id,
    timestamp: response3.data.created_at
  };
}




