// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

function setup() {
  noCanvas();
  loadJSON('/all', gotData);
}


function gotData(data) {
  let words = data.keys;
  for (var i = 0; i < words.length; i++) {
    let word = words[i];
    let count = data.dict[word];
    // Spread out the making of the divs over time
    setTimeout(() => {
      var span = createSpan(word + ": " + count + " ");
      span.class('count');
      span.parent('results');
    }, i * 10)
  }
}