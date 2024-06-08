function setup() {
    createCanvas(800, 400);
  }
  
  function draw() {
    drawSky();
    drawLandscape();
    drawCar(300, 250);
    drawPerson(375, 215);
  }
  
  function drawSky() {
    for (let i = 0; i <= height; i++) {
      let inter = map(i, 0, height, 0, 1);
      let c = lerpColor(color(135, 206, 235), color(255, 204, 0), inter);
      stroke(c);
      line(0, i, width, i);
    }
    noStroke();
  }
  
  function drawLandscape() {
    fill(34, 139, 34); // grass
    rect(0, 300, width, 100);
    drawTree(60, 250);
    drawTree(720, 250);
    drawTree(400, 250);
  }
  
  function drawCar(x, y) {
    fill('#DDDDDD'); // Car body color
    rect(x, y, 150, 50); // Car body
    fill('#BBBBBB'); // Car top color
    arc(x + 75, y, 150, 100, PI, TWO_PI); // Car top arc for a rounded top
  
    // Adding wheels with darker rims
    fill(0);
    ellipse(x + 30, y + 50, 30, 30); // Left wheel
    ellipse(x + 120, y + 50, 30, 30); // Right wheel
    fill(255); // Headlights
    ellipse(x + 140, y + 25, 10, 10);
  }
  
  function drawPerson(x, y) {
    fill(255, 224, 189); // Skin color
    ellipse(x, y, 20, 20); // Head
    fill(0); // Hair
    rect(x - 10, y - 12, 20, 5);
    fill(0); // Body
    rect(x - 10, y + 10, 20, 25);
  }
  
  function drawTree(x, y) {
    fill(139, 69, 19); // Trunk color
    rect(x, y, 20, 50);
    fill(34, 139, 34); // Leaves color
    ellipse(x + 10, y - 20, 60, 80); // more elongated to simulate a fuller canopy
  }
  
  // Optional: Add more environmental details such as rocks, birds, or a river for enhanced realism.
  