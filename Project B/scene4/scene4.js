let up = 1;
let x = 50;
let h = 250;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let r = true;
let acc = 0.2;
let shadow = 100;
let foot = [];
let firstStep = true;
var a;
let button;
var start4;
let H = -780;
var start5 = false;
let fail = false;
let textHide = false;
let end = false;
let v = 1;


function preload() {
  myFont = loadFont("../font/cuteFont.ttf");
  bgM = loadSound("../audio/scene4M.mp3");
  fF = loadSound("../audio/footFall.mp3");
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


  path = loadImage("../image/scene4/path.png");
  dfoot = loadImage("../image/scene3/Rfoot.png");
}

function setup() {
  let a = createCanvas(1200, 400);
  a.parent("scene4");

  foot.push(new Foot());
  button = createButton("Oooooops...Start Again");
  button.style('font-size', '30px');
  button.size(300, 100);
  button.position(width / 2 - 150, height / 2 - 100);
  button.mousePressed(restart);



  button1 = createButton("Got it!");
  button1.style('font-size', '30px');
  button1.size(100, 50);
  button1.position(width / 2 - 50, height / 2 + 15);
  button1.mousePressed(instructions);
}

function draw() {
  background(209, 249, 255);
  image(path, -5, 100, width + 5, 300);
  if (textHide == false) {
    push();
    rectMode(CENTER);
    fill(0, 0, 0, 150);
    rect(width / 2, height / 2, 1200, 400);
    pop();
    textAlign(CENTER);
    fill(255);
    textFont(myFont);
    text("Use Left & Right Arrow Keys To Avoid Being Stepped!", width / 2, height / 2 - 50);
    textSize(40);
  }
  button.hide();
  start4 = getItem("4start");

  push();
  translate(0, 90);
  scale(0.5);

  if (start4 == true) {
    if (!bgM.isPlaying()) {
      bgM.play();
    }
    push();
    translate(0, H);
    if (x > 50 && x < 2150) {
      if (x == 55 && firstStep == true) {
        foot.push(new Foot(x + random(-300, 300)));
        firstStep = false;
      }

      if (frameCount % 130 == 1) {
        foot.push(new Foot(x + random(200, 500)));
      }
      if (frameCount % 180 == 80) {
        foot.push(new Foot(x + random(-600, -300)));
      }

      for (var i = 0; i < foot.length; i++) {
        foot[i].show();
        foot[i].fall();

        //if foot touch snail
        if (
          foot[i].x - x < imageSize - 50 &&
          x - foot[i].x < imageSize + 30 &&
          foot[i].y > -300
        ) {
          button.show();
          fill(255);
          noLoop();

        } //dead & restart
      }
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
    if (H < -10) {
      acc += 0.5;
      H += acc;
    }
  }
  pop();


  // falling snail;

  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      x -= 5;
      r = false;
      up++;
      moveLeft = x + 20 * sin(up * 0.05);
    } else if (keyCode === RIGHT_ARROW) {
      x += 5;
      r = true;
      up++;
      moveLeft = x + 20 * sin(up * 0.05);
    }
  } else {
    end = true;
    moveLeft = x;
  }

  if (x > 2400) {
    bgM.setVolume(v);
    v -= 0.01;
    v = constrain(v, 0, 1);
  }
  if (v < 0.05 && end == true) {
    filter(GRAY);
    bgM.stop();
    noLoop();
    start5 = true;
  }
  storeItem('5start', start5);
}

function restart() {
  loop();
  x = 50;
  foot.length = 0;
}

class Foot {
  constructor(x) {
    this.x = x + 200;
    this.y = -1050;
    this.start = 13;
    this.sound = false;
  }

  show() {
    image(dfoot, this.x, this.y, 500, 700);
  }
  fall() {
    if (this.sound == false) {
      fF.play();
      this.sound = true;
    }
    this.y += this.start;
    this.start -= 0.1;
  }
}

function instructions() {
  button1.hide();
  textHide = true;
}

