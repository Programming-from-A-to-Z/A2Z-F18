// A2Z F18
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F18
// http://shiffman.net/a2z


function setup() {

  noCanvas();

  // Make a text input field
  input = select('#sentence');
  // Make a submit button
  let button1 = select('#pos');
  button1.mousePressed(posSwap);
  let button2 = select('#rhyme');
  button2.mousePressed(rhymeSwap);

  function posSwap() {
    let sentence = input.value();
    let rs = new RiString(sentence);
    let pos = rs.pos();

    let output = '';
    for (let i = 0; i < pos.length; i++) {
      output += RiTa.randomWord(pos[i]);
      output += ' ';
    }
    createP(output).class('text');
  }

  function rhymeSwap() {
    let sentence = input.value();
    let output = sentence.replace(/\b\w+\b/g, replacer);
    createP(output).class('text');

    function replacer(match) {
      console.log(match);
      let rhymes = RiTa.rhymes(match);
      console.log(rhymes);
      // Sometimes RiTa gives back too many choices?
      if (rhymes.length > 0 && rhymes.length < 50) {
        return random(rhymes);
      } else {
        return match;
      }
    }
  }
}
