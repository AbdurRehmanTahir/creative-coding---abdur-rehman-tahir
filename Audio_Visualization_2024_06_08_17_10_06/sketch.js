let mic, fft, amp;
let particles = [];
let bgColor = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();

    // Create an audio input
    mic = new p5.AudioIn();
    mic.start();

    // Create the FFT (Fast Fourier Transform) object
    fft = new p5.FFT();
    fft.setInput(mic);

    // Create the amplitude analyzer
    amp = new p5.Amplitude();
    amp.setInput(mic);

    // Create initial particles
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(bgColor, 20); // Slightly transparent background for a fading effect

    // Get the amplitude values
    let spectrum = fft.analyze();
    let level = amp.getLevel();
    let size = map(level, 0, 1, 100, 600); // Dynamic size based on amplitude

    // Change background color based on amplitude
    bgColor = map(level, 0, 1, 0, 255);

    // Draw the spectrum as a circular waveform
    stroke(255);
    strokeWeight(2);
    translate(width / 2, height / 2);
    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
        let angle = map(i, 0, spectrum.length, 0, TWO_PI);
        let amp = spectrum[i];
        let r = map(amp, 0, 256, size / 2, size); // Use the dynamic size
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);

    // Draw radial lines
    for (let i = 0; i < spectrum.length; i++) {
        let angle = map(i, 0, spectrum.length, 0, TWO_PI);
        let amp = spectrum[i];
        let r = map(amp, 0, 256, size / 2, size);
        let x = r * cos(angle);
        let y = r * sin(angle);
        stroke(255, 100);
        line(0, 0, x, y);
    }

    // Update and display particles
    for (let particle of particles) {
        particle.update(level);
        particle.show();
    }
}

class Particle {
    constructor() {
        this.pos = p5.Vector.random2D().mult(random(50, 250));
        this.vel = createVector(0, 0);
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
        this.w = random(3, 5);
    }

    update(level) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc = p5.Vector.random2D().mult(level * 0.5); // Add more movement with the beat
        if (this.pos.mag() > width / 2) {
            this.pos = p5.Vector.random2D().mult(random(50, 250));
            this.vel = createVector(0, 0);
            this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
        }
    }

    show() {
        noStroke();
        fill(255, 255, 255, 150); // Set color to white with some transparency
        ellipse(this.pos.x, this.pos.y, this.w);
    }
}
