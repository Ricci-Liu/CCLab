let up = 1;
let d;
let x = 50;
let h = 250;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let r = true;
var H = -700;
let acc = 0.2;
let shadow = 10;
let s = 255;
let hasFallen = false;
let pressAble = true;
let bgG = [];
let bgR = [];
let bgP = [];
let o1 = 0, o2 = 0, o3 = 0, o4 = 0;
let start2;
let start3 = false;
let target;
let right;
let left;
let textAppear = false;
let playText = true;

function preload() {
  myFont = loadFont("../font/cuteFont.ttf");
  text2 = loadSound("../text/2-1.m4a");
  move = loadSound("../audio/short.mp3");
  move1 = loadSound("../audio/short1.mp3");
  fallGrass = loadSound("../audio/snail/lightgrass.mp3");
  moving = loadSound("../audio/snail/snailmoving.mp3");
  backGround = loadImage("../image/scene2/background.png");
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


  bgG = loadImage("../image/scene2/greenbg.png");
  bgP = loadImage("../image/scene2/purplebg.png");
  bgr = loadImage("../image/scene2/redbg.png");
}


function setup() {
  let b = createCanvas(500, 600);
  b.parent("scene2");
  for (i = 0; i < 10; i++) {
    bgR[i] = new bgRSnail();
    bgP[i] = new bgPSnail();
    bgG[i] = new bgGSnail();
  }

  d = width - 120;
}

function draw() {

  start2 = getItem("2start");

  if (textAppear == true && start2 == true) {
    if (playText == true) {
      text2.play();
      playText = false;
    }
    o1++;
    o1 = constrain(o1, 0, 200);
    if (o1 >= 50) {
      o2++;
      o2 = constrain(o2, 0, 200);
    }
  }

  background(100, 200, 100);
  image(backGround, 0, 0, width, height);

  push();

  textFont(myFont);
  textSize(50);
  textAlign(CENTER);
  fill(0, o1);
  text('Living with my friends', width / 2, height / 2 - 150);
  fill(0, o2);
  text('Happy as can be', width / 2, height / 2 - 90);

  pop();

  for (i = 0; i < 10; i++) {
    bgG[i].show();
    bgG[i].move();
    bgG[i].reappear();
    bgR[i].show();
    bgR[i].move();
    bgR[i].reappear();
    bgP[i].show();
    bgP[i].move();
    bgP[i].reappear();
  }

  fill(255, 50);
  rect(0, 0, width, height);




  if (start2 == true) {
    if (!move1.isPlaying()) {
      move1.play();
      move1.setVolume(0.3);
    }
    loop();
    scale(0.7);
    fill(100);
    noStroke();
    ellipse(x + imageSize / 2.5 + d, (height * 3) / 4 + 270 + 100, shadow, 30);
    // shadow ellipse
    if (r == true) {
      push();
      translate(0, H);
      image(rHead, x + d, height - h, imageX, imageY);
      push();
      imageMode(CORNERS);
      image(
        rMove,
        x + imageSize / 1.23 + d,
        height - h / 2.6,
        moveLeft + d,
        height - h * 1.07 + imageSize
      );
      pop();
      image(rLeft, x + d, height - h, imageSize, imageSize);
      image(rRight, x + d, height - h, imageSize, imageSize);
      image(rShell, x + d, height - h, imageSize, imageSize);
    } else {
      push();
      translate(0, H);
      image(lHead, x + d, height - h, imageX, imageY);
      push();
      imageMode(CORNERS);
      image(
        lMove,
        x + imageSize / 5.25 + d,
        height - h * 1.07 + imageSize,
        moveLeft + imageSize + d,
        height - h / 2.6
      );
      pop();
      image(lLeft, x + d, height - h, imageSize, imageSize);
      image(lRight, x + d, height - h, imageSize, imageSize);
      image(lShell, x + d, height - h, imageSize, imageSize);
      pop();
    }

    if (H < 200) {
      acc += 2.5;
      H += acc;
      shadow += 7.3; // growing shadow;
    } else if (hasFallen == false) {
      fall();
    }


    if (x + d > -270) {
      if (left == true) {
        if (target - (x + d) < -10) {
          x -= 2;
          pressAble = false;
          r = false;
          up++;
          moveLeft = x + 20 * sin(up * 0.05);
          if (!move.isPlaying()) {
            move.play();
          }
        } else {
          moveLeft = x;
          move.stop();
          pressAble = true;
        }
      } else if (right == true) {
        if (target - (x + d) > -60) {
          x += 2;
          pressAble = false;
          r = true;
          up++;
          moveLeft = x + 20 * sin(up * 0.05);
          if (!move.isPlaying()) {
            move.play();
          }
        }
      } else {
        moveLeft = x;
        move.stop();
        pressAble = true;

      }
    }

    if (x + d < 60) {
      x -= 2;
      up++;
      moveLeft = x + 20 * sin(up * 0.05);
      start3 = true;

    }
    if (x + d <= -250) {
      move1.stop();
      filter(GRAY);
      noLoop();

    }



    storeItem("3start", start3);
  }
}

function mousePressed() {
  textAppear = true;

  target = mouseX;
  if (pressAble == true) {
    if (mouseX - (x + d) > 180) {
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


class bgGSnail {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2 - 130, height / 2 + 120);
    this.s = random(20, 150);
  }
  show() {
    image(bgG, this.x, this.y, this.s * 1.3, this.s);
  }
  move() {
    this.x -= random(0.5, 1.5);
  }
  reappear() {
    if (this.x < -this.s) {
      this.x = width + this.s;
    }
  }
}
class bgRSnail {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2 - 150, height / 2 + 120);
    this.s = random(20, 140);
  }
  show() {
    image(bgr, this.x, this.y, this.s * 1.3, this.s);
  }
  move() {
    this.x -= random(1, 1.5);
  }
  reappear() {
    if (this.x < -this.s) {
      this.x = width + this.s;
    }
  }
}
class bgPSnail {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2 - 150, height / 2 + 120);
    this.s = random(20, 150);
  }
  show() {
    image(bgr, this.x, this.y, this.s * 1.3, this.s);
  }
  move() {
    this.x -= random(0.5, 1.5);
    //this.y += random(-0.2, 0.2);
  }
  reappear() {
    if (this.x < -this.s) {
      this.x = width + this.s;
    }
  }
}

function fall() {
  fallGrass.play();
  hasFallen = true;
}