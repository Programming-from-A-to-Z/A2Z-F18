// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

// Main API URL
let wordnik = 'https://api.wordnik.com/v4/word.json/';
// API Key
let api_key = '/?api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7'

// Get user input
let input;

let exampleButton;
let definitionButton;
let audioButton;

function setup() {
  noCanvas();

  // Get the input from user
  input = select('#word');

  exampleButton = select('#examples');
  definitionButton = select('#definitions');
  audioButton = select('#audio');

  exampleButton.mousePressed(() => {
    let url = wordnik + input.value() + '/examples' + api_key;
    fetch(url)
      .then(response => response.json())
      .then(data => show(data.examples))
      .catch(error => console.error(error));
  });

  definitionButton.mousePressed(() => {
    let url = wordnik + input.value() + '/definitions' + api_key;
    fetch(url)
      .then(response => response.json())
      .then(data => show(data))
      .catch(error => console.error(error));
  });
  audioButton.mousePressed(listAudio);
}

function listAudio() {
  let url = wordnik + input.value() + '/audio' + api_key;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let ol = createElement('ol');
      for (let elt of data) {
        // Make a link that plays the sound
        let a = createA('#', 'play');
        // Attach a sound to the link
        a.mousePressed(() => {
          // Using CORS Anywhere to get around issue with CORS and audio files
          let audio = createAudio('https://cors-anywhere.herokuapp.com/' + elt.fileUrl);
          audio.play();
        });
        let li = createElement('li', elt.audioType + ': ');
        a.parent(li);
        li.parent(ol);
      }
    })
    .catch(error => console.error(error));
}


function show(list) {
  // Render everything as an "ordered list"
  let ol = createElement('ol');
  for (let elt of list) {
    // Get example text
    let li = createElement('li', elt.text);
    li.parent(ol);
  }
}