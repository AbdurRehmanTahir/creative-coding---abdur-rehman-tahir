var img, x, y;

function preload() {
  img = loadImage(
    "OIP.jpg",
    () => console.log('Image loaded successfully'),
    (err) => console.error('Error loading image:', err)
  );
}

function setup() {
  createCanvas(400, 250);
  background(0);
  noStroke();
}

function draw() {
  if (!img) {
    return; // Prevent draw loop from running if the image hasn't loaded
  }
  
  background(0);
  x = mouseX;
  y = mouseY;
  image(img, 0, 0, width, height); // Ensure the image covers the canvas
  var c = img.get(x, y); // Use img.get instead of get for accurate color retrieval
  fill(c);
  ellipse(x, y, 100, 100);
}
