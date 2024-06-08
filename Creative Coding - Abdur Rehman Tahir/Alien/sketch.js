function setup() {
    createCanvas(800, 600);
    noLoop();
  }
  
  function draw() {
    background(10, 10, 20); // Deep space background
    drawPlanets(); // Draw an Earth-like planet with red and blue colors
    drawMoon(); // Draw the moon surface
    drawSpaceship(300, 150); // Position and draw the spaceship
    drawAlien(400, 450); // Position and draw the alien
  }
  
  function drawMoon() {
    fill(130, 130, 130);
    noStroke();
    ellipse(width / 2, 650, 1000, 300); // Large ellipse for moon surface
  }
  
  function drawAlien(x, y) {
    noStroke();
    fill(95, 158, 160); // Subdued green for alien skin tone
    ellipse(x, y, 80, 160); // Body of the alien
    ellipse(x, y - 120, 100, 100); // Head of the alien
    fill(255); // Eyes
    ellipse(x - 20, y - 130, 20, 40); // Left eye
    ellipse(x + 20, y - 130, 20, 40); // Right eye
  }
  
  function drawSpaceship(x, y) {
    fill(180, 180, 180); // Metallic silver
    stroke(100, 100, 100); // Dark grey outline for depth
    strokeWeight(2);
    beginShape();
    vertex(x, y); // Nose tip
    bezierVertex(x - 120, y + 30, x - 80, y + 100, x, y + 120); // Bottom left curve
    bezierVertex(x + 80, y + 100, x + 120, y + 30, x, y); // Bottom right curve
    endShape(CLOSE);
  
    // Cockpit
    fill(95, 158, 160);
    ellipse(x, y + 60, 50, 20);
  
    // Additional design elements like antenna or lights
    stroke(255, 215, 0); // Bright lights
    strokeWeight(5);
    point(x - 50, y + 85); // Left light
    point(x + 50, y + 85); // Right light
  }
  
  function drawPlanets() {
    // Drawing a planet with red and blue colors
    fill(0, 0, 255); // Blue for water regions
    ellipse(700, 100, 100, 100);
    fill(255, 0, 0); // Red for land areas
    ellipse(690, 90, 30, 30);
    ellipse(720, 120, 20, 20);
    ellipse(710, 70, 15, 15);
  }
  