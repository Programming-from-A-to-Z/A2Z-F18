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
let generating = false;

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

function generate() {
  if (generating) {
    generating = false;
    button.html('generate');
  } else {
    generating = true;
    button.html('pause');
    loopRNN();
  }
}

async function loopRNN() {
  let par = select('#result');
  while (generating) {
    let temperature = tempSlider.value();
    let next = await charRNN.predict(temperature);
    await charRNN.feed(next.sample);
    par.html(par.html() + next.sample);
  }
}
