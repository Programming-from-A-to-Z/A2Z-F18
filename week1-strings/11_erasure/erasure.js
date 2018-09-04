// A2Z F18
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F18
// http://shiffman.net/a2z

// The cut-up algorithm is performed in this function
function process(data) {

  // I'm doing something special here with a regex
  // To keep the delimiter, you have to use regex
  // more about this next week
  // let words = data.split(/([ .,:;!@#$%&*()\n])/);

  let words = splitTokens(data, ' .,:;!@#$%&*()\n');

  let par = createP('');
  par.class('text');

  // Here each word is made into a div
  for (let i = 0; i < words.length; i++) {
    let div = createDiv(words[i] + ' ');
    // This keeps it looking like regular text
    div.style('display', 'inline');
    // This makes it look clickable
    div.style('cursor', 'pointer');

    // The div is placed inside the paragraph element
    div.parent(par);

    // Handling mouseover, mouseout, and pressed
    div.mouseOver(highlight);
    div.mouseOut(unhighlight);
    // "remove" the word when pressed
    div.mousePressed(eraseIt);
  }

  paragraphs.push(par);


}

// The function refers to "this"
// "this" is the div that the event is triggered on
// p5 very conveniently assigns the element to this so that
// the same callback can be used for many elements
// more about this in future weeks!
function eraseIt() {
  console.log(this);
  if (spacingCheck.checked()) {
  //if (spacingCheck.checked()) {
    // "removing it by changing the color to match background"
    this.style('color', '#FFF');
    this.style('background-color', '');
  } else {
    // Actually hiding the div itself
    this.hide();
  }
}

function highlight() {
  this.style('background-color', '#AAA')
}

function unhighlight() {
  this.style('background-color', '');
}
