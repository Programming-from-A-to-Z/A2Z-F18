// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// This is based on Allison Parrish's great RWET examples
// https://github.com/aparrish/rwet-examples

// Prototype is magic!  By accessing Array.prototype
// we can augment every single String Array object with an new function

// This object will do a Markov chain by character or by "word"

// A function to split a text up into tokens
// Just using spaces for now to preserve punctuation
String.prototype.tokenize = function() {
  return this.split(/\s+/);
}

// Like python's choice this will return a
// random element from an array
Array.prototype.choice = function() {
  let i = floor(random(this.length));
  return this[i];
}

// A Markov Generator class
class MarkovGeneratorWord {

  constructor(n, max) {
    // Order (or length) of each ngram
    this.n = n;
    // What is the maximum amount we will generate?
    this.max = max;
    // An object as dictionary
    // each ngram is the key, a list of possible next elements are the values
    this.ngrams = {};
    // A separate array of possible beginnings to generated text
    this.beginnings = [];
  }

  // A function to feed in text to the markov chain
  feed(tokens) {

    // Discard this line if it's too short
    if (tokens.length < this.n) {
      return false;
    }

    // Store the first ngram of this line
    let beginning = tokens.slice(0, this.n).join(' ');
    this.beginnings.push(beginning);

    // Now let's go through everything and create the dictionary
    for (let i = 0; i < tokens.length - this.n; i++) {
      // Usings slice to pull out N elements from the array
      let gram = tokens.slice(i, i + this.n).join(' ');
      // What's the next element in the array?
      let next = tokens[i + this.n];

      // Is this a new one?
      if (!this.ngrams[gram]) {
        this.ngrams[gram] = [];
      }
      // Add to the list
      this.ngrams[gram].push(next);
    }
  }

  // Generate a text from the information ngrams
  generate() {

    // Get a random beginning
    let current = this.beginnings.choice();

    // The output is now an array of tokens that we'll join later
    let output = current.tokenize();


    // Generate a new token max number of times
    for (let i = 0; i < this.max; i++) {
      // If this is a valid ngram
      if (this.ngrams[current]) {
        // What are all the possible next tokens
        let possible_next = this.ngrams[current];
        // Pick one randomly
        let next = possible_next.choice();
        // Add to the output
        output.push(next);
        // Get the last N entries of the output; we'll use this to look up
        // an ngram in the next iteration of the loop
        current = output.slice(output.length - this.n, output.length).join(' ');
      } else {
        break;
      }
    }
    // Here's what we got!
    return output.join(' ');
  }
}
