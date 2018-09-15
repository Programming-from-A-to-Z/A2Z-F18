// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z

let emojis;

function setup() {
  noCanvas();

  // Now with Fetch!
  fetch('sea_emoji.json')
    .then(response => response.json())
    .then(data => emojis = data.seaEmoji)
    .catch(error => console.error(error));

  let button = select('#button');
  button.mousePressed(() => {
    let span = createSpan(random(emojis))
    // Demonstrating chaining
    span.style('font-size', '64px').parent('emojis');
  });
}