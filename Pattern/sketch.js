function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    angleMode(DEGREES);
    noStroke();
    background(30);
  }
  
  function draw() {
    let gridSize = 50;
    let noiseScale = 0.05;
  
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
  
        // Generate Perlin noise values
        let noiseVal = noise(x * noiseScale, y * noiseScale);
        let shapeType = floor(noiseVal * 2);
        let col1 = color(noiseVal * 255, 50, 100);
        let col2 = color((1 - noiseVal) * 100, 50, 255);
        let angle = noiseVal * 360;
        
        push();
        translate(x + gridSize / 2, y + gridSize / 2);
        rotate(angle);
        
        // Gradient effect with layered shapes
        for (let r = gridSize * 0.5; r > 0; r -= 10) {
          let inter = map(r, gridSize * 0.5, 0, 0, 1);
          let c = lerpColor(col1, col2, inter);
          fill(c);
  
          if (shapeType === 0) {
            drawSukunaStyle(r);
          } else if (shapeType === 1) {
            drawGojoStyle(r);
          }
        }
        pop();
      }
    }
  }
  
  function drawSukunaStyle(radius) {
    beginShape();
    for (let i = 0; i < 8; i++) {
      let angle = 360 / 8 * i;
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    
    stroke(255, 0, 0);
    strokeWeight(2);
    line(-radius, 0, radius, 0);
    line(0, -radius, 0, radius);
    noStroke();
  }
  
  function drawGojoStyle(radius) {
    ellipse(0, 0, radius * 2);
    
    stroke(0, 255, 255);
    strokeWeight(1);
    for (let i = 0; i < 8; i++) {
      let angle = 360 / 8 * i;
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      line(0, 0, x, y);
    }
    noStroke();
  }
  