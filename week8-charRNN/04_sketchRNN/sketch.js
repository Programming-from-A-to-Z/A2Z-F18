let sketch;
let prev_pen = [1, 0, 0];
let x, y;

const options = {
  temperature: 0.5
};

function setup() {
  createCanvas(400, 300);
  sketch = ml5.SketchRNN('cat', modelReady);
  background(220);

  let button = select('#draw');
  button.mousePressed(() => {
    x = width / 2;
    y = height / 2;
    background(220);
    sketch.reset();
    next();
  });
}

function next() {
  sketch
    .generate(options)
    .then(response => drawIt(response))
    .catch(error => console.error(error));
}

function modelReady() {
  console.log('model ready');
  next();
}

function drawIt(info) {
  [dx, dy, pen_down, pen_up, pen_end] = info;

  if (prev_pen[0] == 1) {
    stroke(0);
    strokeWeight(3.0);
    line(x, y, x + dx, y + dy);
  }

  x += dx;
  y += dy;
  prev_pen = [pen_down, pen_up, pen_end];

  if (pen_end !== 1) {
    setTimeout(next, 5);
  }
}
