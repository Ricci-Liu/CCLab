let up = 1;
let x = 0;
let h = 250;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let r = false;
let shadow = 100;
let beeX, beeY;
let nowBeeX = 0;
let beeSpd = 0;
let xAcc = 0;
let speedX = 0;
let target = 0;
let left, right;
let start8;
let start9 = false;
let bx, by, relative;
let fall = -500;
let speedY = 0;
let pressAble = true;
let textAppear = false;
let playText = true;
let o1 = 0, o2 = 0, o3 = 0, o4 = 0;
let bgSound = 1;

function preload() {
  myFont = loadFont("../font/cuteFont.ttf");
  text8 = loadSound("../text/8.m4a");
  move = loadSound("../audio/short.mp3");
  beeSound = loadSound("../audio/bee.mp3");
  birdSound = loadSound("../audio/bird.mp3");
  riverSound = loadSound("../audio/water.mp3");

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
  bg = loadImage("../image/scene8/background.png");
  blueBird = loadImage("../image/scene8/blueBird.png");
  greenBird = loadImage("../image/scene8/greenBird.png");
  pinkBird = loadImage("../image/scene8/pinkBird.png");
  frontGrass = loadImage("../image/scene8/frontGrass.png");
}

function setup() {
  let a = createCanvas(1200, 600);
  a.parent("scene8");
  py = 0;
  beeX = 0;
  move.setVolume(0.7);
}


function draw() {

  start8 = getItem("8start");
  if (start8 == true) {
    if (!birdSound.isPlaying()) {
      birdSound.play();
    }
    if (!beeSound.isPlaying()) {
      beeSound.play();
    }
    if (!riverSound.isPlaying()) {
      riverSound.play();
    }
    if (fall < 170) {
      fall += speedY;
      let acc = 0.1;
      speedY += acc;
    }
    relative = map(x, 0, 1500, 0, width);
    birdSound.setVolume(map(relative, 0, 400, 1, 0, true));
    beeSound.setVolume(
      map(dist(relative - 150, 0, 300, 0), 0, 400, 0.5, 0, true)
    );
    riverSound.setVolume(map(dist(relative, 0, 1100, 0), 0, 400, 1, 0, true));
  }

  noStroke();
  fill(80);
  image(bg, 0, 0, width, height);
  if (textAppear == true && start8 == true) {
    if (playText == true) {
      text8.play();
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
  textSize(40);
  textAlign(CENTER);
  fill(20, o1);
  text('Because I’m slow and steady', width / 2 + 100, 110);
  fill(20, o2);
  text('I hear things others can’t', width / 2 + 100, 190);
  fill(20, o3);
  text('Nature’s sounds are all around', width / 2 + 100, 270);
  fill(20, o4);
  text('It’s like a secret chant', width / 2 + 100, 350);
  pop();

  if (frameCount % 100 < 10) {
    py = -5 * cos(frameCount * 0.5);
  }

  if (frameCount % 110 < 10) {
    gy = -5 * cos(frameCount * 0.5);
  }

  if (frameCount % 90 < 10) {
    by = -5 * cos(frameCount * 0.5);
  }

  image(pinkBird, 20, 30 + py, 100, 70);
  image(greenBird, 130, 100 + gy, 100, 90);
  image(blueBird, 120, 240 + by, 100, 70);

  if (frameCount % 30 == 1) {
    nowBeeX = beeX;
  }

  xAcc = (400 - nowBeeX) * 0.01;
  beeSpd += xAcc;
  beeSpd = beeSpd * 0.85;
  beeX += beeSpd;
  image(bee, (beeX += random(-2, 2)), 350 + random(-0.5, 0.5), 70, 80);

  if (start8 == true) {
    push();
    translate(0, fall);
    scale(0.7);
    fill(30);

    if (fall >= 170) {
      noStroke();
      ellipse(x + imageSize / 2.2, height - h + imageSize / 1.1, imageSize, 30);
    }
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
    pop();
  }

  if (left == true) {
    x -= 2;
    pressAble = false;
    r = false;
    up++;
    moveLeft = x + 20 * sin(up * 0.05);
    if (!move.isPlaying()) {
      move.play();
    }
  } else if (right == true) {
    x += 2;
    pressAble = false;
    r = true;
    up++;
    moveLeft = x + 20 * sin(up * 0.05);
    if (!move.isPlaying()) {
      move.play();
    }
  } else {
    pressAble = true;
    move.stop();
  }

  push();
  translate(0, -250);
  imageMode(CENTER);
  image(frontGrass, 320, 770, 400, 180);
  pop();

  if (x > 1400) {
    x += 2;
    up++;
    moveLeft = x + 20 * sin(up * 0.05);

  }
  if (x > 1750) {
    start9 = true;
    riverSound.setVolume(bgSound);
    move.setVolume(bgSound);
    bgSound -= 0.05;
  }
  if (bgSound <= 0.02) {
    noLoop();
    filter(GRAY);
    riverSound.stop();
    move.stop();
  }
  storeItem('9start', start9);
}

function mousePressed() {
  textAppear = true;
  if (pressAble == true) {
    if (mouseX - relative > -10) {
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
}
