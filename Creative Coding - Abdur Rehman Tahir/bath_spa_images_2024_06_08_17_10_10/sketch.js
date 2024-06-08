let angle = 0;

function setup() {
  createCanvas(600, 425); // Create a canvas of 800x600 pixels
  textAlign(CENTER, CENTER); // Align text to the center
  textSize(64); // Set text size to 64 pixels
}

function draw() {
  setGradient(0, 0, width, height, color(255, 102, 102), color(102, 178, 255)); // Draw gradient background
  drawText();
}

function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function drawText() {
  fill(0, 102, 153); // Set fill color for the text
  textStyle(BOLD); // Make text bold
  let x = width / 2;
  let y = height / 2 + sin(angle) * 20; // Animate text vertically
  angle += 0.05; // Increase angle for next frame
  
  // Draw shadow
  fill(50, 50, 50, 100);
  text('Bath Spa', x + 5, y + 5);
  
  // Draw main text
  fill(255);
  text('Bath Spa', x, y);
}
