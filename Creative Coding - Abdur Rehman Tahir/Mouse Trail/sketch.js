let particles = [];
let maxParticles = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  
}

function draw() {
 background("#000000");

  
  // Add a new particle at the mouse position with random properties
  let p = new Particle(mouseX, mouseY, color(random(255), random(255), random(255)));
  particles.push(p);

  // Remove the oldest particle if the array exceeds maxParticles
  if (particles.length > maxParticles) {
    particles.splice(0, 1);
  }

  // Update and display particles
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

class Particle {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.size = random(5, 20);
    this.lifespan = 255;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.lifespan -= 2;
  }

  display() {
    fill(red(this.col), green(this.col), blue(this.col), this.lifespan);
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('dynamic_mouse_trail', 'png');
  }
}