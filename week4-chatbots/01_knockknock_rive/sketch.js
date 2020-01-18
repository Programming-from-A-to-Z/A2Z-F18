// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

function setup() {
  noCanvas();

  // Create a RiveScript bot
  const bot = new RiveScript();

  // Load the bot files (this can be more than one)
  const files = ['brain/knockknock.rive'];

  bot.loadFile(files)
    .then(() => {
      console.log("Bot loaded");
      bot.sortReplies();
    })
    .catch(error => console.error(error));

  // Grab some DOM elements
  const button = select('#submit');
  const input = select('#textinput');
  const output = select('#bot');

  // Whenever the user hits "submit" ask the bot to say something
  button.mousePressed(() => {
    // What did the user say?
    const txt = input.value();
    // What does the bot say?
    bot.reply("local-user",txt)
      .then(reply => output.html(reply))
      .catch(error => console.error(error));
  });
}
