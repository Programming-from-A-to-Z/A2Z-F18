console.log('The bot is starting');

const config = require('./config.js');
const Mastodon = require('mastodon-api');
const M = new Mastodon(config);

toot();
setInterval(toot, 1000 * 60 * 5);

function toot() {
  const num = Math.floor(Math.random() * 100);
  const params = {
    spoiler_text: "The meaning of life is...",
    status: num
  }

  M.post('statuses', params).
    then(response => {
      console.log("Success!");
      console.log(`id: ${response.data.id} at ${response.data.created_at}`);
    }).
    catch(error => {
      console.log("OOPS");
      console.error(error);
    });


  // M.post('statuses', params, (error, response) => {
  //   if (error) {
  //     console.log("OOPS");
  //     console.error(error);
  //   } else {
  //     console.log("Success!");
  //     console.log(`id: ${response.id} at ${response.created_at}`);
  //   }
  // });
}
