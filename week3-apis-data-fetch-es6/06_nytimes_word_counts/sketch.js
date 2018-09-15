// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z

// API documentation
// http://developer.nytimes.com

// Count term appearance in times per year
var start, end, total, w;

var totalCalls = 0;

// Make a url that searhces for term appeared in a given year
function makeURL(term, year) {
  var apikey = 'api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102';
  var api = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
  //var api = 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&';
  var query = '&q=' + term + '&facet_fields=source&begin_date=' + year + '0101&end_date=' + year + '1231&facet=1';
  var url = api + apikey + query;
  return url;
}

function setup() {

  // A canvas for drawing!
  var canvas = createCanvas(800, 200);
  background(51);

  // How many years to look at?
  start = 1950;
  end = 2014;
  total = end - start;

  // How wide is each bar
  w = width / total;

  // What should we search for?
  input = select('#search');
  var button = select('#submit');
  // Execute the query
  button.mousePressed(searchIt);
}

// This callback is for when the user clicks the button
function searchIt() {
  background(0);

  // Reset total number of API calls to zero
  totalCalls = 0;

  var term = input.value();
  // Loop through every year
  for (var i = 0; i < total; i++) {
    var year = start + i;
    // Make the API query URL
    var url = makeURL(term, year);
    // console.log(url);
    // Run the query and keep track of the index
    goJSON(url, i);
  }
}

function goJSON(url, index) {

  // The NYTimes will complain if you hit them too quickly with
  // many requests, so this spaces them out by 1 second
  setTimeout(delayLoad, index * 1000);

  // Run the query with that specific URL
  function delayLoad() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Set a default total to 0
        var count = 0;
        // If you get good data, get the real count
        if (data.response.facets.source.terms[0]) {
          count = data.response.facets.source.terms[0].count;
        }
        // Map the count to a range to fit in canvas
        // Could do better here
        var h = map(count, 0, 1000, 0, 50);
        fill(175);
        stroke(0);
        // Draw a bar for the graph
        rect(index * w, height - h, w - 2, h);

        // An API call is complete
        totalCalls++;

        // Are they all done?
        if (totalCalls === total) {
          createP('finished querying NY Times.');
        }
      })
      .catch(error => console.error(error));
  }
}