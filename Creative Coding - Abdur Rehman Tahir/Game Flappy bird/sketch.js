let bird;
let pipes = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(135, 206, 235); // Sky blue background

  if (!gameOver) {
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      } else { 
        if (pipes[i].hits(bird)) {
          gameOver = true;
        }

        if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.x) {
          score++;
          pipes[i].passed = true;
        }
      }
    }

    bird.update();
    bird.show();

    if (frameCount % 120 == 0) {  // Increased interval between pipes
      pipes.push(new Pipe());
    }

    displayScore();
  } else {
    showGameOver();
  }
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
  }
  if (key.toLowerCase() === 'r') {
    resetGame();
  }
}

function resetGame() {
  bird = new Bird();
  pipes = [];
  score = 0;
  gameOver = false;
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.size = 32;
    this.gravity = 0.5; // Reduced gravity
    this.lift = -12; // Less dramatic lift
    this.velocity = 0;
  }

  show() {
    fill(255, 204, 0);
    stroke(255, 153, 0);
    ellipse(this.x, this.y, this.size, this.size); // Body
    triangle(this.x - 1, this.y, this.x - 20, this.y - 10, this.x - 20, this.y + 10); // Tail
    fill(255); // Eye
    ellipse(this.x + 10, this.y - 10, 10, 10);
    fill(0); // Pupil
    ellipse(this.x + 12, this.y - 10, 5, 5);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.95;

    if (this.y >= height - this.size / 2) {
      this.y = height - this.size / 2;
      this.velocity = 0;
      gameOver = true;
    }

    if (this.y <= this.size / 2) {
      this.y = this.size / 2;
      this.velocity = 0;
    }
  }
}

class Pipe {
  constructor() {
    this.spacing = random(height / 4, height / 3); // Increased spacing
    this.top = random(height / 6, height / 2);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80; // Wider pipes
    this.speed = 2; // Reduced speed
    this.passed = false;
  }

  hits(bird) {
    if (bird.y - bird.size / 2 < this.top || bird.y + bird.size / 2 > height - this.bottom) {
      if (bird.x + bird.size / 2 > this.x && bird.x - bird.size / 2 < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    fill(34, 139, 34);
    stroke(0);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x + this.w < 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bird.y = height / 2;
  bird.x = 64;
}

function displayScore() {
  fill(0);
  textSize(32);
  text('Score: ' + score, 10, 30);
}

function showGameOver() {
  fill(0);
  textSize(64);
  textAlign(CENTER);
  text('Game Over', width / 2, height / 2);
  textSize(32);
  text('Final Score: ' + score, width / 2, height / 2 + 50);
  text('Press R to Restart', width / 2, height / 2 + 100);
  textAlign(LEFT); // Reset text alignment
}
