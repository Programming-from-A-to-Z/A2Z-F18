// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// This is based on Allison Parrish's great RWET examples
// https://github.com/aparrish/rwet-examples

// Prototype is magic!  By accessing Array.prototype
// we can augment every single Array object with an new function

// Like python's choice this will return a
// random element from an array
Array.prototype.choice = function() {
  var i = floor(random(this.length));
  return this[i];
}

// A grammar with empty rules object
class ContextFree {
  constructor() {
    this.rules = {};
  }

  // Rules are stored in the rules object
  // the rules themselves are arrays of expansions (which themselves are arrays)
  addRule(rule, expansion) {
    if (this.rules.hasOwnProperty(rule)) {
      this.rules[rule].push(expansion);
    } else {
      this.rules[rule] = [expansion];
    }
  }

  addRules(rules) {
    // Copying all of the properties over
    for (var rule in rules) {
      //console.log(rule);
      this.rules[rule] = rules[rule];
    }
  }


  // This function recursively calls itself
  // over and over until it reaches a terminal
  expand(start, expansion) {
    if (this.rules.hasOwnProperty(start)) {
      // Grab one possible expansion
      var possibilities = this.rules[start];
      var picked = possibilities.choice();

      // call this method again with the current element of the expansion
      for (var i = 0; i < picked.length; i++) {
        this.expand(picked[i], expansion);
      }
      // If the rule wasn't found, then it's a terminal
      // add the String to the array
    } else {
      expansion.push(start);
    }
  }

  // Start an expansion
  getExpansion(axiom) {
    // Start with an empty array
    var expansion = [];
    // Call the expand function
    this.expand(axiom, expansion);
    // Send back a String (rather than array)
    return expansion.join(' ');
  }
}
