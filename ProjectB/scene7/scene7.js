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
let textAppear = false;
let playText = true;
let o1 = 0, o2 = 0, o3 = 0, o4 = 0;


function preload() {
  myFont = loadFont("../font/cuteFont.ttf");
  text7 = loadSound("../text/7.m4a");
  lLeft = loadImage("../image/scene7/l.png");
  lRight = loadImage("../image/scene7/r.png");
}

function setup() {
  let a = createCanvas(850, 500);
  a.parent("scene7");
}

function draw() {
  background(245, 237, 206);
  if (textAppear == true && start7 == true) {
    if (playText == true) {
      text7.play();
      playText = false;
    }
    if (o1 <= 200) {
      o1++;
      o1 = constrain(o1, 0, 200);
    }
    if (o1 >= 50) {
      o2++;
      o2 = constrain(o2, 0, 200);
    }
    if (o2 >= 50) {
      o3++;
      o3 = constrain(o3, 0, 200);
    }
    if (o3 >= 50) {
      o4++;
      o4 = constrain(o4, 0, 200);
    }
  }

  push();
  colorMode(RGB);
  textFont(myFont);
  textSize(30);
  fill(20, o1);
  text('On my antennas I’ve got', 10, 100);
  fill(20, o2);
  text('Two tiny little eyes', 10, 180);
  fill(20, o3);
  text('They can’t see much but light', 10, 260);
  fill(20, o4);
  text('But that’s enough of the surprise', 10, 340);
  pop();

  start7 = getItem('7start')
  let a = 6;
  noStroke();
  fill(0);
  image(lLeft, x, -90 + f, a * imageSize, a * imageSize);
  ellipse(x + 265, 185 + f, 15, 40 * sin(blink * 0.03 + 0.5))
  image(lRight, x, -90 + f, a * imageSize, a * imageSize);
  ellipse(x + 45, 240 + f, 15, 40 * sin(blink * 0.03));
  if (start7 == true) {
    if (x >= 230) {
      x -= 1;
    } else if (x > -600 && x < 230 && textAppear == true) {
      x -= 0.5;
    }
    blink++;

    if (x < 0) {
      f += acc;
      acc += 0.15;
      start8 = true;
    }
    if (x < -80) {
      noLoop();
      filter(GRAY);
    }

  }
  storeItem('8start', start8);
}

function mousePressed() {
  textAppear = true;
}
