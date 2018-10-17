// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Thanks to Dana for the idea: http://www.blondishmoment.com/2015/10/21/icm7/

// An array of lines from a text file
let lines;

// The Markov Generator object
let markovs = [];

// These are the "orders" this example will support
let current = 3;
let start = 2;
let end = 11;

// Counting if the API calls are finished
let count = 0;
let total = 0;

// For "loading animation"
let angle = 0;

function setup() {
  // Make a canvas for a loading animation
  let canvas = createCanvas(50, 50);
  canvas.parent('loading');
  // Also a div to say loading
  let div = createDiv("loading");
  div.parent('loading');
  // Let's make a whole bunch of markov generators
  // All with different orders so we can use them whenever!
  for (let i = start; i < end; i++) {
    markovs[i] = new MarkovGenerator(i, 1000);
  }

  // Newest relationship advice posts
  getAdvice()
    .then(response => {
      console.log(response);
      // Show the interface
      let inter = select('#interface');
      inter.show();
      // Hide the loading animation
      let loading = select('#loading');
      noLoop();
      loading.hide();
    })
    .catch(error => console.log(error));

  // Set up a button
  let button = select('#button');
  button.mousePressed(() => {
    // Display the generated text
    let output = select('#advice');
    let text = markovs[current].generate();
    output.html(text);
  });

  // This slider changes the "order" of the markov chain
  let slider = select('#slider');
  slider.input(() => {
    // Regenerate the markov chain with new order value
    order = slider.value();
    // Update DOM element to show user changed value
    let span = select('#order');
    span.html(order);
  });
}

// A draw function for a loading animation
function draw() {
  background(255);
  translate(width / 2, height / 2);
  rotate(angle);
  fill(200);
  ellipse(0, 0, width, height);
  strokeWeight(4);
  line(-width / 2, 0, width / 2, 0);
  stroke(0);
  line(0, -height / 2, 0, height / 2);
  angle += 0.1;
}


async function getAdvice() {
  let url = 'https://www.reddit.com/r/relationship_advice.json';
  let response = await fetch(url);
  let data = await response.json();
  for (let i = 0; i < data.data.children.length; i++) {
    let id = data.data.children[i].data.id;
    console.log(id);
    let newurl = 'https://www.reddit.com/r/relationship_advice/comments/' + id + '.json';
    let newresponse = await fetch(newurl);
    let newdata = await newresponse.json();
    let advice = newdata[1].data.children;
    // Feed in the text to all of the APIs!
    for (let i = 0; i < advice.length; i++) {
      for (let n = start; n < end; n++) {
        let txt = advice[i].data.body;
        if (txt) {
          markovs[n].feed(txt);
        }
      }
    }
  }
  return 'success';
}


function delay(time) {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error('delay requires a valid number.'));
    } else {
      setTimeout(resolve, time);
    }
  });
}