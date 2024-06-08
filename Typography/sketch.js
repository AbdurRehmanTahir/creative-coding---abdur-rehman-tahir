let words = ['I', 'LOVE', 'ME'];
let letters = [];
let springiness = 0.05;
let damping = 0.95;
let restLength = 100;

function setup() {
  createCanvas(800, 800);
  textFont('Georgia');
  textSize(64);
  textAlign(CENTER, CENTER);

  let totalLetters = words.join('').length;
  let angleStep = TWO_PI / totalLetters;
  
  let angle = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      letters.push(new SpringLetter(words[i][j], angle, restLength));
      angle += angleStep;
    }
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (let letter of letters) {
    letter.update();
    letter.display();
  }
}

class SpringLetter {
  constructor(char, angle, restLength) {
    this.char = char;
    this.angle = angle;
    this.restLength = restLength;
    this.position = createVector(cos(angle) * restLength, sin(angle) * restLength);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  update() {
    let targetX = cos(this.angle) * this.restLength;
    let targetY = sin(this.angle) * this.restLength;
    let forceX = (targetX - this.position.x) * springiness;
    let forceY = (targetY - this.position.y) * springiness;
    this.acceleration = createVector(forceX, forceY);

    this.velocity.add(this.acceleration);
    this.velocity.mult(damping);
    this.position.add(this.velocity);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle + HALF_PI);
    fill(lerpColor(color(255, 100, 150), color(100, 200, 255), frameCount % 100 / 100));
    text(this.char, 0, 0);
    pop();
  }
}
