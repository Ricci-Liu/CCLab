let x = 450;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let blink = 0;
let f = 0;
let acc = 1;
let start7;
let start8 = false;


function preload() {
  lLeft = loadImage("../image/scene7/l.png");
  lRight = loadImage("../image/scene7/r.png");
}

function setup() {
  let a = createCanvas(850, 500);
  a.parent("scene7");
}

function draw() {
  background(245, 237, 206);
  start7 = getItem('7start')
  let a = 6;
  noStroke();
  fill(0);
  image(lLeft, x, -90 + f, a * imageSize, a * imageSize);
  ellipse(x + 265, 185 + f, 15, 40 * sin(blink * 0.03 + 0.5))
  image(lRight, x, -90 + f, a * imageSize, a * imageSize);
  ellipse(x + 45, 240 + f, 15, 40 * sin(blink * 0.03));
  if (start7 == true) {
    if (x > -600) {
      x -= 1;
    }
    blink++;

    if (x < 0) {
      f += acc;
      acc += 0.15;
      start8 = true;
    }

  }
  storeItem('8start', start8);
  if (start8) {
    filter(GRAY);
    noLoop();
  }
}
