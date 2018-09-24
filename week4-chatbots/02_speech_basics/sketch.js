// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18


function setup() {
  // Create a speech object
  const voice = new p5.Speech();
  voice.onLoad = function () {
    // Ask for all the possible voices and put them in a dropdown
    dropdown = createSelect();
    dropdown.parent('voices');
    let voices = voice.voices;
    for (let i = 0; i < voices.length; i++) {
      dropdown.option(voices[i].name);
    }
  }

  // A small canvas to show when its "talking" or not
  createCanvas(200, 20).parent('canvas');
  background(0);

  // Grab a bunch of DOM elements
  const txtInput = select('#say');
  const vslider = select('#volume');
  const rslider = select('#rate');
  const pslider = select('#pitch');

  // This button will trigger speaking
  const button = select('#speak');
  button.mousePressed(() => {
    // What to say
    let say = txtInput.value();
    // Who to say it
    let name = dropdown.value();

    // Volume, rate, pitch
    voice.setVolume(vslider.value());
    voice.setRate(rslider.value());
    voice.setPitch(pslider.value());

    // Talk!
    voice.setVoice(name);
    voice.speak(say);
  });

  // Events for starting and stopping talking
  voice.started(() => background(0, 255, 0));
  voice.ended(() => background(0));

  // This will be for all of the voice options
  let dropdown;

}