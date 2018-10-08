console.log('The bot is starting');

const config = require('./config.js');
const Mastodon = require('mastodon-api');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const M = new Mastodon(config);
const cmd = 'processing-java --sketch=/Users/a2z/Documents/mastodon_examples/mastodon3/squares --run';

setInterval(toot, 5000);

function toot() {
  exec(cmd).
    then(response => {
      console.log(response.stdout);
      console.log(response.stderr);
      const stream = fs.createReadStream('squares/output.png');
      const media = {
        file: stream,
        description: 'A square image of random grey squares.'
      };
      return M.post('media', media);
    }).
    then(response => {
      console.log(response.data.id);
      // fs.writeFileSync('response.json', JSON.stringify(response, null, 2));
      const toot = {
        status: 'Squares!',
        media_ids: [response.data.id]
      }
      return M.post('statuses', toot);
    }).
    then(response => {
      console.log("Success!");
      console.log(`id: ${response.data.id} at ${response.data.created_at}`);
    }).
    catch(error => console.error(error));

}




