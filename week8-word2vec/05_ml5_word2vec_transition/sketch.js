// A2Z F18
// Daniel Shiffman
// https://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Using https://ml5js.org

let word2vec;
let path;

function setup() {
  word2vec = ml5.word2vec('data/wordvecs10000.json', modelLoaded);
  noCanvas();
}

function modelLoaded() {
  select('#status').html('Model Loaded');
  select('#start').changed(go);
  select('#end').changed(go);
  go();
}

function go() {
  count = 0;
  let a = select('#start').value();
  let b = select('#end').value();
  path = [];
  average(a, b, path, 0).then(result => {
    select('#between').html(join(path, '<br>'));
  });
}

async function average(a, b, path, level) {
  let result = await word2vec.average([a, b]);
  let word = result[0].word;
  if (level < 2) {
    await average(a, word, path, level + 1);
  }
  path.push(word);
  if (level < 2) {
    await average(word, b, path, level + 1);
  }
  return;
}
