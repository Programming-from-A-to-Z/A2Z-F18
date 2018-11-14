// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// https://github.com/NaturalNode/natural
// http://stackoverflow.com/questions/10059594/a-simple-explanation-of-naive-bayes-classification
// http://shiffman.github.io/A2Z-F15/week5/notes.html#naive-bayesian-text-classification

// Using express: http://expressjs.com/
const express = require('express');
// Create the app
const app = express();

// File System for loading the list of words
const fs = require('fs');

// Using node natural
const natural = require('natural');

// Cors for allowing "cross origin resources"
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
const cors = require('cors');
app.use(cors());

// "body parser" is need to deal with post requests
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// This is for hosting files
app.use(express.static('public'));

// Set up the server
const server = app.listen(3000, listen);

// This call back just tells us that the server has started
function listen() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// Do we already have a classifier "database"
const exists = fs.existsSync('classifier.json');

// If we do, load it
if (exists) {
  natural.BayesClassifier.load('classifier.json', null, loaded);
  // If not make a new one
} else {
  console.log('starting a new classifier');
  classifier = new natural.BayesClassifier();
}

// All set and loaded
function loaded(err, cf) {
  classifier = cf;
  console.log('Classifier loaded');
}

// This is a post for training
app.post('/train', training);

function training(req, res) {
  // Get the text and category
  const text = req.body.text;
  const category = req.body.category;

  // Add the document and train
  classifier.addDocument(text, category);
  classifier.train();

  // Save to the "database"
  classifier.save('classifier.json', saved);

  // All done saving, can send a message back to client
  function saved(err, classifier) {
    console.log('finished training and saving');
    res.send(req.body);
  }
}

// This is a POST for classifying a text
app.post('/classify', classify);

// Handle the POST
function classify(req, res) {
  // What is the text
  const text = req.body.text;
  // Use natural to classify
  const classification = classifier.classify(text);
  // Also look at all the metadaya
  const all = classifier.getClassifications(text);

  // Make a reply that has all the info
  const reply = {
    category: classification,
    classifications: all
  };

  // Send it back
  res.send(reply);
}
