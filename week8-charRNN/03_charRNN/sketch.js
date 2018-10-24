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

let lstm;
let textInput;
let tempSlider;
let button;

function setup() {
  noCanvas();

  // Create the LSTM Generator passing it the model directory
  lstm = ml5.charRNN('./models/woolf/', modelReady);

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
  select('#length').html(lengthSlider.value());
  select('#temperature').html(tempSlider.value());
}

function modelReady() {
  select('#status').html('Model Loaded');
}

// Generate new text
function generate() {
  // Grab the original text
  let original = textInput.value();
  // Make it to lower case
  let txt = original.toLowerCase();
  let temperature = tempSlider.value();

  // Check if there's something to send
  if (txt.length > 0) {
    // Generate text with the lstm
    lstm.feed(txt);
    lstm.predict(temperature, gotData);

    // When it's done
    function gotData(err, result) {
      console.log(result);
      // Update the status log
      // select('#result').html(txt + result.sample);
    }
  }
}
