// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
LSTM Generator example with p5.js
This uses a pre-trained model on a corpus of Virginia Woolf
For more models see: https://github.com/ml5js/ml5-data-and-training/tree/master/models/lstm
=== */

let charRNN;
let textInput;
let tempSlider;
let button;

function setup() {
  noCanvas();
  // Create the LSTM Generator passing it the model directory
  charRNN = ml5.charRNN('./models/woolf/', modelReady);
  // Grab the DOM elements
  textInput = select('#textInput');
  tempSlider = select('#tempSlider');
  button = select('#generate');

  // DOM element events
  button.mousePressed(generate);
  tempSlider.input(updateSliders);
}

// Update the slider values
function updateSliders() {
  select('#temperature').html(tempSlider.value());
}

function modelReady() {
  select('#status').html('Model Loaded');
}

async function generate() {
  charRNN.reset();
  // Grab the original text s
  let next = 'the meaning of life ';
  let par = createP(next);
  // Generate text with the lstm
  for (let i = 0; i < 100; i++) {
    let temperature = tempSlider.value();
    await charRNN.feed(next);
    next = await charRNN.predict(temperature);
    par.html(par.html() + next);
  }
}
