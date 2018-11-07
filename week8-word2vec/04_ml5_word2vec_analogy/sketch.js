// A2Z F18
// Daniel Shiffman
// https://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using https://ml5js.org

let word2vec;

function setup() {
  word2vec = ml5.word2vec('data/wordvecs10000.json', modelLoaded);
  noCanvas();
}

function modelLoaded() {
  select('#status').html('Model Loaded');
  calculate();
  let a = select('#a').changed(calculate);
  let b = select('#b').changed(calculate);
  let c = select('#c').changed(calculate);
}

async function calculate() {
  try {
    let a = select('#a').value();
    let b = select('#b').value();
    let c = select('#c').value();
    let difference = await word2vec.subtract([b, a]);
    let result = await word2vec.add([c, difference[0].word]);
    select('#d').html(result[0].word);
  } catch {
    console.log('not found');
    // select('#d').html('');
  }
}
