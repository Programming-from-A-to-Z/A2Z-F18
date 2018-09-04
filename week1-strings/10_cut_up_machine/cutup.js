// A2Z F18
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F18
// http://shiffman.net/a2z

// The cut-up algorithm is performed in this function
function process(data) {

  // Split into words
  let words = splitTokens(data, ' .,:;!@#$%&*()\n');

  // Shuggle the array randomly
  words = shuffle(words);

  // Create a new string to store the "cut-up"
  let output = '';
  // For every word
  for (let i = 0; i < words.length; i++) {
    // Randomly choose to include it based on
    // percentage
    if (random(100) < percent) {
      output += words[i] + ' ';
    }
  }

  // Display the cut-up in a paragraph element
  let txt = createP(output);
  txt.class('text');
  paragraphs.push(txt);
}


// A function to shuffle an array
// From: http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
