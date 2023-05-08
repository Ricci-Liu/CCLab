let up = 1;
let x = 50;
let h = 250;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let r = true;
let H = -700;
let acc = 0.2;
let shadow = 10;
let s = 255;
let start2 = false;
let left;
let right;
let speedX = 0;
let target = 0;
let pressAble = true;
let textAppear = false;
let o1 = 0, o2 = 0;
let playText = true;
let start1;
let instrR = false;
let instrL = false;



function preload() {
  click = loadImage("../image/click.png");
  myFont = loadFont("../font/cuteFont.ttf");
  text1 = loadSound("../text/1-1.m4a");
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

  sign = loadImage("../image/scene1/heretostart.png");

}

function setup() {
  let a = createCanvas(1200, 600);
  a.parent("scene1");
  //getAudioContext().suspend();

}

function draw() {

  let start1 = getItem("1start");
  if (textAppear == true && start1 == true) {
    if (playText == true) {
      text1.play();
      playText = false;
    }
    o1++;
    o1 = constrain(o1, 0, 255);
    if (o1 >= 50) {
      o2++;
      o2 = constrain(o2, 0, 255);
    }
  }
  background(252, 239, 169);
  fill(50, s);
  noStroke();
  push();



  textFont(myFont);
  textSize(50);
  fill(0, o1);
  text('I am a snail', 100, 100);
  fill(0, o2);
  text('Gray,green and plain', 100, 180);
  image(sign, width - 380, height / 2 - 30, 220, 250);

  pop();
  if (start1 == true) {
    if (x < width * 2 / 3 && instrR == false) {
      image(click, width / 3, height / 2 + 50, 60, 60);
      textSize(25);
      textFont(myFont);
      fill(100);
      text('Click anywhere to the right of the snail to move right ', width / 3 - 200, height / 2 + 30);
    } else if (x < width * 2 / 3 && instrR == true && instrL == false) {
      image(click, width / 3 - 300, height / 2 + 50, 60, 60);
      textSize(25);
      textFont(myFont);
      fill(100);
      text('Click anywhere to the left of the snail to move left ', width / 3 - 380, height / 2 + 30);
    } else {
      textSize(25);
      textFont(myFont);
      fill(100);
      text('Move around and see what happens!', width / 2 - 370, height / 2 + 30);
    }

    ellipse(x + imageSize / 2.5, height * 3 / 4 + 30 + 100, shadow, 30);
    //shadow ellipse

    fill(10);
    ellipse(width - 180, height * 3 / 4 + 100, imageSize * 1.2, imageSize / 3);


    if (r == true) {

      push();
      translate(0, H);
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
      if (target - (x + width - 250) > 50) {
        x += speedX;
        up++;
        moveLeft = x + 20 * sin(up * 0.05);
      } else {
        onePlay = true;
      }
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

      if (target - (x + width - 250) < 160) {
        x += speedX;
        up++;
        moveLeft = x + 20 * sin(up * 0.05);
      }
    }
    if (H < -10) {
      acc += 0.5;
      H += acc;
      shadow += 3.3; // growing shadow;
    }
    //falling snail;
  }


  if (x > 880) {
    acc += 0.5;
    H += acc;
    start2 = true;
    s = 0;
  }
  if (x > 910 && H >= 800) {
    noLoop();

    filter(GRAY);
    left = false;
    right = false;

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
    moveLeft = x;
    move.stop();
    pressAble = true;
  }


  if (x > 870 && x < 960) {
    acc += 0.5;
    H += acc;
  }


  storeItem('2start', start2);
}

function mousePressed() {
  //userStartAudio();
  textAppear = true;
  if (pressAble == true) {
    if (mouseX - x > 180) {
      right = true;
      left = false;
      instrR = true;
      setTimeout(function () {
        right = false;
        left = false;
      }, 1500);

    } else {
      left = true;
      right = false;
      instrL = true;
      setTimeout(function () {
        right = false;
        left = false;
      }, 1500);

    }
  }
}

