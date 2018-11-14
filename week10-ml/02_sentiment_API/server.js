// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
// https://www.npmjs.com/package/sentiment

// Using express: http://expressjs.com/
const express = require('express');
// Create the app
const app = express();

// File System for loading the list of words
const fs = require('fs');

// Cors for allowing "cross origin resources"
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
const cors = require('cors');
app.use(cors());

// A new package for sentiment analysis
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// "body parser" is need to deal with post requests
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// This is for hosting files
app.use(express.static('public'));

// Our "database" (in addition to what is in the AFINN-111 list)
// is "additional.json", check first to see if it exists
let additional;
const exists = fs.existsSync('additional.json');
if (exists) {
  // Read the file
  console.log('loading additional words');
  const txt = fs.readFileSync('additional.json', 'utf8');
  // Parse it  back to object
  additional = JSON.parse(txt);
} else {
  // Otherwise start with blank list
  console.log('No additional words');
  additional = {};
}

// Set up the server
// process.env.PORT is related to deploying on heroku
const server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// A route for adding a new word with a score
app.get('/add/:word/:score', addWord);

// Handle that route
function addWord(req, res) {
  // Word and score
  const word = req.params.word;
  // Make sure it's not a string by accident
  const score = Number(req.params.score);

  // Put it in the object
  additional[word] = score;

  // Let the request know it's all set
  const reply = {
    status: 'success',
    word: word,
    score: score
  };
  console.log('adding: ' + JSON.stringify(reply));

  // Write a file each time we get a new word
  // This is kind of silly but it works
  const json = JSON.stringify(additional, null, 2);
  fs.writeFile('additional.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing additional.json');
    // Don't send anything back until everything is done
    res.send(reply);
  }
}

// Now here we take a POST request
// This is to analyze a larger body of text
app.post('/analyze', analyze);

function analyze(req, res) {
  // The bodyParse package allows us to easily just grab the "text" field
  const text = req.body.text;
  // Send back the results of the analysis
  // Use the additional words too
  const reply = sentiment.analyze(text, additional);
  res.send(reply);
}
