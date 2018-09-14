// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z

let url1 = "https://api.wordnik.com/v4/word.json/";
let word = "rainbow";
let url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"

let link;

function setup() {
  noCanvas();
  link = select('#word');
  link.mousePressed(() => {
    fetch(url1 + word + url2)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          createP('no related words');
        } else {
          let index1 = floor(random(0, data.length));
          let index2 = floor(random(0, data[index1].words.length));
          word = data[index1].words[index2];
          link.html(word);
        }
      })
      .catch(err => console.error);
  });
}