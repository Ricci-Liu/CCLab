let up = 1;
let x = 50;
let h = 250;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let r = true;
var a;
var start4;
let H = -780;
var start5 = false;
let s = 100;
let o = 200;
let b = 100;
let moonH = 30;
let sunH = -300;
var start5;
var start6 = false;
let canMove = false;
let fade = 0;
let w = -300;
let left, right;
let fail = false;
let dead = 0;
let nightS = 1;
let morningS = 0;
let pressAble = true;
let o1 = 0, o2 = 0, o3 = 0, o4 = 0;
let textAppear = false;
let playText = true;



function preload() {
  click = loadImage("../image/click.png");
  myFont = loadFont("../font/cuteFont.ttf");
  text4 = loadSound("../text/4.m4a");

  move = loadSound("../audio/short.mp3");
  night = loadSound("../audio/night.mp3");
  hot = loadSound("../audio/hot.mp3");

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

  lDead = loadImage("../image/scene5/lDead.png");
  rDead = loadImage("../image/scene5/rDead.png");

  bg = loadImage("../image/scene5/desert.png");
  sun = loadImage("../image/scene5/sun.png");
  moon = loadImage("../image/scene5/moon.png");
}

function setup() {
  a = createCanvas(1200, 600);
  a.parent("scene5");
  colorMode(HSB); //change sky color

  button = createButton("TOO HOT...Start Again");
  button.size(200, 100);
  button.position(width / 2 - 100, height / 2);
  button.mousePressed(reStart);
}

function draw() {

  if (textAppear == true && start5 == true) {
    if (playText == true) {
      text4.play();
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
    if (o1 == 200) {
      o1--;
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

  button.hide();
  start5 = getItem("5start");
  background(220, s, b);

  image(bg, 0, height / 2 - 100, width, height / 2 + 100);

  push();
  colorMode(RGB);
  fill(0, o);
  rect(0, 0, width, height);
  pop();

  push();
  colorMode(RGB);
  textFont(myFont);
  textSize(50);
  textAlign(CENTER);
  fill(255, o1);
  text('That hot ball up high', width / 2 - 70, 50);
  fill(255, o2);
  text('Has hurt many of my friends', width / 2 - 70, 120);
  fill(255, o3);
  text('We must move quickly', width / 2 - 70, 190);
  fill(255, o4);
  text('Before our journey ends', width / 2 - 70, 260);
  pop();

  image(moon, width / 2 + 30, moonH, 200, 250);



  if (start5 == true) {
    if (x < 300) {
      image(click, width / 3, height / 2 + 50, 100, 100);
    }
    if (!night.isPlaying()) {
      night.play();
    }
    if (!hot.isPlaying()) {
      hot.play();
    }
    night.setVolume(nightS);
    hot.setVolume(morningS);
    fade++;
    if (w < 20) {
      w += 2;
    } else {

      canMove = true;
      s -= 0.2;
      b += 0.2;

      if (o > 0) {
        o -= 0.3;
      }
      moonH -= 0.5;

      if (moonH < -10) {
        image(sun, width / 2 - 400, sunH, 300, 250);
        if (sunH < 30) {
          sunH += 0.5;
        }
      }
      if (sunH > -300) {
        nightS -= 0.002;
        nightS = constrain(nightS, 0, 1);

        morningS += 0.002;
        morningS = constrain(morningS, 0, 1);
      }
    }
  }

  //button.hide();

  translate(w, 0);
  fill(0, 0, 0);
  noStroke();
  ellipse(x + imageSize / 2.2, height - h + imageSize / 1.1, imageSize, 30);

  push();

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



  if (left == true) {
    x -= 2.5;
    r = false;
    up++;
    pressAble = false;
    moveLeft = x + 20 * sin(up * 0.05);
    if (!move.isPlaying()) {
      move.play();
    }
  } else if (right == true) {
    x += 2.5;
    r = true;
    pressAble = false;
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

  if (sunH >= 29 && x < 930) {
    button.show();
    fail = true;
    //night.stop();
    // hot.stop();
    if (r == true) {
      image(rDead, x, height - h - dead, imageSize * 1.2, imageSize);
    } else {
      image(lDead, x, height - h - dead, imageSize * 1.2, imageSize);
    }
    dead += 2;
  } else if (x > 830) {
    x += 2;
    start6 = true;
    night.stop();
    hot.stop();
  }
  if (x > 1200) {
    noLoop();
    filter(GRAY);
  }
  storeItem('6start', start6);
}


function mousePressed() {
  textAppear = true;


  if (fail == false) {
    if (canMove == true && pressAble == true) {
      target = mouseX;

      if (mouseX - x > 120) {
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
}

function reStart() {

  x = -50;
  r = true;

  fail = false;
  s = 100;
  o = 200;
  b = 100;
  moonH = 30;
  sunH = -300;
  nightS = 1;
  morningS = 0;

}
