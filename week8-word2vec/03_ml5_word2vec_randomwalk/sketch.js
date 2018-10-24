// A2Z F18
// Daniel Shiffman
// https://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using https://ml5js.org

let word2vec;

let current = 'the';
let interval;

function modelLoaded() {
  select('#status').html('Model Loaded');
}

function setup() {
  noLoop();
  noCanvas();
  // Create the Word2Vec model with pre-trained file of 10,000 words
  word2vec = ml5.word2vec('data/wordvecs10000.json', modelLoaded);
  // word2vec = ml5.word2vec('data/nature_of_code_vectors.json', modelLoaded);

  let button = select('#startButton');
  button.mousePressed(() => {
    clearInterval(interval);
    current = select('#wordinput').value();
    console.log(current);
    interval = setInterval(walk, 1000);
  });
}

function walk() {
  word2vec.nearest(current, 10).then(result => {
    console.log(result);
    let next = random(result);
    current = next.word;
    select('#walk').html(current);
  });
}
