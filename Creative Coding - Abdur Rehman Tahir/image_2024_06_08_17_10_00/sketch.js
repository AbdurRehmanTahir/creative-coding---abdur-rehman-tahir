var img;
function preload() {
img = loadImage("O.jpg");
}

function setup () {
createCanvas (700, 400);
background(0);
}

function draw() {
background(0);
image(img, 0, 0);
var v = map(mouseX, 0, width, 2, 20);
filter(POSTERIZE, v);
}

