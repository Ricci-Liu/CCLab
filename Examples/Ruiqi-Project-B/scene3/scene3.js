let up = 1;
let x = 140;
let h = 250;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let r = true;
let acc = 1;
let shadow = 100;
let start3;
let W = 700;
let P = -400;
let fH = -1000;
let accF = 0;
let shakeX = 0;
let shakeY = 0;
let fall = 0;
let jump = 20;
let start4 = false;
let hasFallen = false;
let right;
let left;

function preload() {
  fallGrass = loadSound("../audio/snail/heavygrass.mp3");
  move = loadSound("../audio/short.mp3");
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

  lFoot = loadImage("../image/scene3/Lfoot.png");
  rFoot = loadImage("../image/scene3/Rfoot.png");
  bg = loadImage("../image/scene3/bg.png");
}

function setup() {
  let c = createCanvas(700, 600);
  c.parent("scene3");
}

function setup() {
  let a = createCanvas(700, 600);
  //a.parent("startScene");
}

function draw() {
  start3 = getItem("3start");

  background(255);
  push();
  translate(shakeX, shakeY);
  image(bg, P, -10, width + 400, height + 100);
  fill(100);
  noStroke();
  ellipse(P + 120, height - 60, 450, 50);

  push();
  translate(0, fH); // falling giant foot
  image(lFoot, P - 50, -10, 650, height + 100);
  image(rFoot, P - 60, -10, 650, height + 100);
  pop();
  if (start3 == true) {
    if (x > -250) {
      x -= 2;
      moveLeft = x + 10 * sin(up * 0.05);
      up++;
    }
    push();
    translate(W, 0);
    scale(0.7);

    push();
    translate(0, 220 + fall);
    fill(100);
    noStroke();
    ellipse(x + imageSize / 2.2, height - h + imageSize / 1.1, imageSize, 30);
    // shadow ellipse

    if (r == false) {
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
    pop();
    pop();

    moveLeft = x + 10 * sin(up * 0.05);

    // print(mouseX-(x+W));
    if (left == true) {
      if (target - (x + W) < 160) {
        x -= 8;
        r = true;
        up++;
        moveLeft = x + 20 * sin(up * 0.05);
        if (!move.isPlaying()) {
          move.play();
        }
      }
    } else if (right == true) {
      if (target - (x + W) > 160) {
        x += 1;
        r = false;
        up++;
        moveLeft = x + 20 * sin(up * 0.05);
        if (!move.isPlaying()) {
          move.play();
        }
      }
    } else {
      moveLeft = x;
      move.stop();
    }

    if (x < -670) {
      if (P < 0) {
        P += 5;
        W += 4;

        if (fH < -20) {
          fH += accF;
          accF += 0.8;

        } else {
          if (hasFallen == false) {
            footFall();
          }
          shakeX = random(-5, 5);
          shakeY = random(-5, 5);

          acc += 0.1;
          fall -= jump;
          jump -= acc;
          start4 = true;
        }
      }
    }
  }
  storeItem("4start", start4);
  if (start4) {
    filter(GRAY);
    noLoop();
  }
}
function mousePressed() {
  target = mouseX;
  if (mouseX - (x + W) > 180) {
    right = true;
    left = false;

    setTimeout(function () {
      right = false;
      left = false;
    }, 1500);

  } else {
    left = true;
    right = false;

    setTimeout(function () {
      right = false;
      left = false;
    }, 1500);

  }
}
function footFall() {
  fallGrass.play();
  hasFallen = true;
}