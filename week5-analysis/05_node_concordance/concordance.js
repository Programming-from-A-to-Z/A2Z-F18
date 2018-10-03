// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// This is a way of making something available to another JS file in node
module.exports = {

  // An object that does classification with us of words
  Concordance: class {

    constructor() {
      this.dict = {};
      this.keys = [];
    }

    // Splitting up the text
    split(text) {
      // Split into array of tokens
      return text.split(/\W+/);
    }

    // A function to validate a toke
    validate(token) {
      return /\w{2,}/.test(token);
    }

    // Process new text
    process(data) {
      var tokens = this.split(data);
      // For every token
      for (var i = 0; i < tokens.length; i++) {
        // Lowercase everything to ignore case
        var token = tokens[i].toLowerCase();
        if (this.validate(token)) {
          // Increase the count for the token
          this.increment(token);
        }
      }
    }

    // An array of keys
    getKeys() {
      return this.keys;
    }

    // Get the count for a word
    getCount(word) {
      return this.dict[word];
    }

    // Increment the count for a word
    increment(word) {
      // Is this a new word?
      if (!this.dict[word]) {
        this.dict[word] = 1;
        this.keys.push(word);
        // Otherwise just increment its count
      } else {
        this.dict[word]++;
      }
    }

    // Sort array of keys by counts
    sortByCount() {
      // Sort based on count!
      this.keys.sort((a, b) => this.getCount(b) - this.getCount(a));
    }
  }
};