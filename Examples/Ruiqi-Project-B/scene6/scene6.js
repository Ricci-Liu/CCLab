let up = 1;
let x = 400;
let h = 250;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let r = false;
let shadow = 100;
let birdX = 900;
let birdY = 100;
let scorX = 950;
let scorY = 0;
let beeX = 900;
let beeY = 300;
let nowBeeX = 0;
let beeSpd = 0;
let xAcc = 0;
let speedX = 0;
let target = 0;
let left, right;
let start6;
let start7 = false;


function preload() {

  rHead = loadImage("../image/scene1/headR.png");
  rShell = loadImage("../image/scene1/shellR.png");
  rMove = loadImage("../image/scene1/moveR.png");
  rLeft = loadImage("../image/scene1/leftR.png");
  rRight = loadImage("../image/scene1/rightR.png");

  lHead = loadImage("../image/scene1/headL.png");
  lShell = loadImage("../image/scene1/shellL.png");
  lMove = loadImage("../image/scene1/moveL.png");
  lLeft = loadImage("../image/scene1/leftL.png");
  lRight = loadImage("../image/scene1/rightL.png");

  bee = loadImage("../image/scene6/bee.png");
  bg = loadImage("../image/scene6/bg.png");
  bird = loadImage("../image/scene6/bird.png");
  scorpion = loadImage("../image/scene6/scorpion.png");
}

function setup() {
  let a = createCanvas(850, 500);
  a.parent("scene6");
}

function draw() {
  start6 = getItem("6start");
  storeItem('7start', start7);
  background(255);
  noStroke();
  fill(80);
  image(bg, 0, 0, width, height);
  if (start6 == true) {
    if (x > 50) {
      x -= 2;
    }
    birdX -= 5;
    birdY = 60 + 30 * sin(frameCount * 0.08);
    fill(80);
    ellipse(birdX + 55, height - 100, birdY / 1.3, birdY / 2); //bird shadow
    image(bird, birdX, birdY, 110, 80);
    if (birdX < -100) {
      birdX = 900;
    }
    //bird

    scorX -= 3.5;
    if (scorX < -150) {
      scorX = 900;
    }
    scorY += random(-1, 1);
    fill(80);
    ellipse(scorX + 80, scorY + height - 155, 130, 20); //scorpion shadow
    image(scorpion, scorX, scorY + height - 250, 150, 100);

    if (frameCount % 30 == 1) {
      nowBeeX = beeX;
    }
    xAcc = (width - 250 + x - nowBeeX) * 0.01;
    beeSpd += xAcc;
    beeSpd = beeSpd * 0.85;
    beeX += beeSpd;
    ellipse(beeX + 35, height - 100, 50, 10);
    image(bee, (beeX += random(-1, 1)), beeY - 50 + random(-0.5, 0.5), 70, 80);

    push();
    translate(width - 250, 150);
    scale(0.7);
    fill(30);
    noStroke();
    ellipse(x + imageSize / 2.2, height - h + imageSize / 1.1, imageSize, 30);

    if (r == true) {
      image(rHead, x, height - h, imageX, imageY);
      push();
      imageMode(CORNERS);
      image(
        rMove,
        x + imageSize / 1.23,
        height - h / 2.6,
        moveLeft,
        height - h * 1.07 + imageSize
      );
      pop();
      image(rLeft, x, height - h, imageSize, imageSize);
      image(rRight, x, height - h, imageSize, imageSize);
      image(rShell, x, height - h, imageSize, imageSize);
    } else {
      image(lHead, x, height - h, imageX, imageY);
      push();
      imageMode(CORNERS);
      image(
        lMove,
        x + imageSize / 5.25,
        height - h * 1.07 + imageSize,
        moveLeft + imageSize,
        height - h / 2.6
      );
      pop();
      image(lLeft, x, height - h, imageSize, imageSize);
      image(lRight, x, height - h, imageSize, imageSize);
      image(lShell, x, height - h, imageSize, imageSize);
    }

    if (left == true) {
      x -= 8;
      r = false;
      up++;
      moveLeft = x + 10 * sin(up * 0.05);
    } else if (right == true) {
      x += 2;
      r = true;
      up++;
      moveLeft = x + 10 * sin(up * 0.05);
    } else {
      moveLeft = x;
    }

    pop();

    if (x < -850) {
      x -= 2;
      start7 = true;
    }
  }
  if (start7) {
    filter(GRAY);
    noLoop();
  }
}

function mousePressed() {
  if (mouseX - x > 800) {
    right = true;
    left = false;

    setTimeout(function () {
      right = false;
      left = false;
    }, 1000);
  } else {
    left = true;
    right = false;

    setTimeout(function () {
      right = false;
      left = false;
    }, 1000);
  }
}
