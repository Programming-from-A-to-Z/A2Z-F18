let sentiment;

function setup() {
  noCanvas();
  sentiment = new Sentiment();
  sentiment
    .init()
    .then(response => select('#status').html(response))
    .catch(error => console.error(error));

  let txt = select('#userInput');
  let button = select('#submit');
  button.mousePressed(analyzeThis);

  function analyzeThis() {
    let results = sentiment.predict(txt.value());
    let percentage = nf(100 * results.score, 2, 2);
    select('#score').html(`${percentage}%`);
  }
}
