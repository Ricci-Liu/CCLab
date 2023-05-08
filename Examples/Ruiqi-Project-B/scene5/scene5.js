let up = 1;
let x = 50;
let h = 250;
let imageX = 250;
let imageY = 250;
let imageSize = 250;
let moveSize = 250;
let moveLeft = 50;
let r = true;
let a;
let start4;
let H = -780;
let start5 = false;
let s = 100;
let o = 200;
let b = 100;
let moonH = 30;
let sunH = -300;
let start5;
let start6 = false;
let canMove = false;
let fade = 0;
let w = -300;
let left, right;
let fail = false;
let dead = 0;
let nightS = 1;
let morningS = 0;


function preload() {
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


  button.hide();
  start5 = getItem("5start");
  background(220, s, b);

  image(bg, 0, height / 2 - 100, width, height / 2 + 100);

  push();
  colorMode(RGB);
  fill(0, o);
  rect(0, 0, width, height);
  pop();
  image(moon, width / 2 + 30, moonH, 200, 250);

  if (start5 == true) {
    /*
    if (!night.isPlaying()) {
      night.play();
    }
    if (!hot.isPlaying()) {
      hot.play();
    }
    */
    night.setVolume(nightS);
    hot.setVolume(morningS);
    fade++;
    if (w < 20) {
      w += 2;
    } else {
      if (fade > 60 * 10) {
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
        if (sunH > 10) {
          nightS = 0;
          morningS = 1;
        }
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
    x -= 2;
    r = false;
    up++;
    moveLeft = x + 20 * sin(up * 0.05);
    if (!move.isPlaying()) {
      move.play();
    }
  } else if (right == true) {
    x += 2;
    r = true;
    up++;
    moveLeft = x + 20 * sin(up * 0.05);
    if (!move.isPlaying()) {
      move.play();
    }
  } else {
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
  } else if (x > 930) {
    x += 2;
    start6 = true;
    //.stop();
    //hot.stop();
  }
  storeItem('6start', start6);
  if (start6) {
    filter(GRAY);
    noLoop();
  }
}


/*
let state = false;
 
// if clicked
// state = true;
 
if (state) {
  volume += 0.1;
  volume = constrain(volume, 0, 1);
}
 
*/

function mousePressed() {
  if (!night.isPlaying()) {
    night.play();
  }
  if (!hot.isPlaying()) {
    hot.play();
  }

  if (fail == false) {
    if (canMove == true) {
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

  //night.play();
  //hot.play();
  nightS = 1;
  morningS = 0;

}
