// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Voice Chatbot with p5.Speech
// Edited Video: https://youtu.be/iFTgphKCP9U

function setup() {
  noCanvas();

  let bot = new RiveScript();
  bot.loadFile("brain.rive")
    .then(() => {
      console.log('Chatbot ready!');
      bot.sortReplies();
    })
    .catch(error => console.error(error));

  let speech = new p5.Speech();
  let speechRec = new p5.SpeechRec('en-US', gotSpeech);

  function gotSpeech() {
    if (speechRec.resultValue) {
      let input = speechRec.resultString;
      //user_input.value(input);
      bot.reply("local-user", input).then(reply => speech.speak(reply));
    }
  }

  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);

  // let button = select('#submit');
  // let user_input = select('#user_input');
  // let output = select('#output');
  // button.mousePressed(chat);
}