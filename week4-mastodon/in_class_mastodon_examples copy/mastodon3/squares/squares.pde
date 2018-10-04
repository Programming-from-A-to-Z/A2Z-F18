
void setup() {
  size(400, 400);
  background(0);
  for (int i = 0; i < 10; i++) {
    fill(255, random(255));
    rectMode(CENTER);
    rect(random(width),random(height), 100, 100);
  }
  
  save("output.png");
  println("processing complete");
  exit();
}