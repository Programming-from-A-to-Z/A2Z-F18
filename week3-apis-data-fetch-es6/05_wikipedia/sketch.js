// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z

// Documentation for Wikipedia API
// https://en.wikipedia.org/w/api.php

// Input from user
let input;

function setup() {
  noCanvas();

  // Grab the input and button from HTML
  input = select('#search');
  let button = select('#submit');
  // Attach a callback to button press
  button.mousePressed(search);
}

// Run the API call
function search() {
  let term = input.value();

  // URL for querying wikipedia
  let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' +
    '&search=' + term;

  // Dealing with CORS problem and Wikipedia
  url = 'https://cors-anywhere.herokuapp.com/' + url;

  // Query the URL, set a callback
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Look at article list
      let articles = data[1];

      // Make a clickable link for each one
      for (let article of articles) {

        // We could also have this example just link to the articles themselves
        // let link = 'http://en.wikipedia.org/w/index.php?title=' + articles[i];
        // let a = createA(link, articles[i]);

        // But we are doing something fancier and excuting another query!
        let li = createElement('li', '');
        let a = createA('#', article);
        a.parent(li);
        li.parent('list');
        // Another callback
        setCallback(a, article);
      }
    })
    .catch(err => console.error);

}


// A closure to attach a callback
// to an <a> anchor tag
function setCallback(a, article) {
  // Form the URL
  let url = 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json';
  // Dealing with CORS problem and Wikipedia
  url = 'https://cors-anywhere.herokuapp.com/' + url;
  a.mousePressed(() => {
    // Wikipedia wants underscores instead of spaces
    article = article.replace(/\s+/, '_');
    console.log(url + '&titles=' + article);
    // The callback for this is gotContent
    fetch(url + '&titles=' + article)
      .then(response => response.json())
      .then(data => {
        let page = data.query.pages;
        // The content is in the page's ID #, but we don't actually know the ID number
        // But it always comes first, this is a goofy way to get it
        let id = Object.keys(page)[0];
        // Look at the actual content
        let txt = page[id].revisions[0]['*'];
        // Show in on the HTML page
        createP(txt);
      })
      .catch(err => console.error);
  });
}