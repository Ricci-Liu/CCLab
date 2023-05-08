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
var start6;
var start7 = false;
let pressAble = true;
let textAppear = false;
let playText = true;
let o1 = 0, o2 = 0, o3 = 0, o4 = 0;


function preload() {
  click = loadImage("../image/click.png");
  myFont = loadFont("../font/cuteFont.ttf");
  text6 = loadSound("../text/6.m4a");
  move = loadSound("../audio/short.mp3");
  beeSound = loadSound("../audio/bee.mp3");
  birdSound = loadSound("../audio/bird.mp3");
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
  if (textAppear == true && start6 == true) {
    if (playText == true && start6 == true) {
      text6.play();
      playText = false;
    }
    if (start6 == true) {
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
  }

  push();
  colorMode(RGB);
  textFont(myFont);
  textSize(50);
  textAlign(CENTER);
  fill(50, o1);
  text('I know I am not as fast', width / 2, 90);
  fill(50, o2);
  text('As others in the race', width / 2, 150);
  fill(50, o3);
  text('But being a little snail', width / 2, 210);
  fill(50, o4);
  text('Is my own special grace', width / 2, 270);
  pop();
  if (start6 == true) {
    if (x < 300) {
      image(click, width / 3, height / 2 + 50, 60, 60);
    }
    if (!beeSound.isPlaying()) {
      beeSound.setVolume(0.5);
      beeSound.play();
    }
    if (!birdSound.isPlaying()) {
      birdSound.play();
    }
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
      x -= 2;
      r = false;
      pressAble = false;
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
      moveLeft = x;
      move.stop();
    }

    pop();

    if (x < -800) {
      x -= 2;
      start7 = true;
      beeSound.stop();
      birdSound.stop();
    }
    if (x < -1150) {
      noLoop();
      filter(GRAY);
    }
  }
}


function mousePressed() {
  let nowX = map(x, -1000, 400, 0, width);
  textAppear = true;
  if (pressAble == true) {
    if (mouseX - nowX > 0) {
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
}
