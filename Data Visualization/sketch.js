let data = [25, 50, 75, 100, 50, 75, 25, 90, 45];
let labels = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi'];
let maxValue;
let margin = 60;
let barWidth;
let tooltip = { show: false, value: 0, x: 0, y: 0 };

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxValue = max(data);
  barWidth = (width - 2 * margin) / data.length;
}

function draw() {
  background(245);
  
  // Draw title
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(50);
  textStyle(BOLD);
  text('Professional Data Visualization', width / 2, margin / 2);
  
  let chartWidth = width - 2 * margin;
  let chartHeight = height - 2 * margin;

  // Draw grid lines
  stroke(220);
  for (let i = 0; i <= 5; i++) {
    let y = map(i, 0, 5, height - margin, margin);
    line(margin, y, width - margin, y);
  }

  // Draw bars
  for (let i = 0; i < data.length; i++) {
    let x = margin + i * barWidth;
    let y = height - margin;
    let barHeight = map(data[i], 0, maxValue, 0, chartHeight);
    
    // Gradient fill for bars with shadow
    noStroke();
    for (let j = 0; j < barHeight; j++) {
      let inter = map(j, 0, barHeight, 0, 1);
      let c = lerpColor(color(0, 102, 204), color(51, 204, 204), inter);
      stroke(c);
      line(x, y - j, x + barWidth, y - j);
    }

    // Shadow effect
    fill(0, 0, 0, 50);
    noStroke();
    rect(x + 5, y - barHeight + 5, barWidth, barHeight);

    // Display data values on bars
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(data[i], x + barWidth / 2, y - barHeight - 5);
  }

  // Draw axes
  stroke(0);
  line(margin, height - margin, width - margin, height - margin); // x-axis
  line(margin, margin, margin, height - margin); // y-axis
  
  // Draw labels
  textSize(14); // Smaller font size for labels
  textAlign(CENTER, TOP);
  for (let i = 0; i < labels.length; i++) {
    let x = margin + i * barWidth + barWidth / 2;
    let y = height - margin + 10;
    fill(50);
    text(labels[i], x, y);
  }

  // Draw y-axis values
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 5; i++) {
    let y = map(i, 0, 5, height - margin, margin);
    fill(50);
    text(int(maxValue * i / 5), margin - 10, y);
  }

  // Draw tooltip
  if (tooltip.show) {
    fill(0);
    stroke(255);
    rect(tooltip.x, tooltip.y - 30, 50, 30, 5);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text(tooltip.value, tooltip.x + 25, tooltip.y - 15);
  }
}

function mouseMoved() {
  tooltip.show = false;
  for (let i = 0; i < data.length; i++) {
    let x = margin + i * barWidth;
    let y = height - margin;
    let barHeight = map(data[i], 0, maxValue, 0, height - 2 * margin);
    if (mouseX > x && mouseX < x + barWidth && mouseY > y - barHeight && mouseY < y) {
      tooltip.show = true;
      tooltip.value = data[i];
      tooltip.x = mouseX;
      tooltip.y = mouseY;
      break;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  barWidth = (width - 2 * margin) / data.length;
}
