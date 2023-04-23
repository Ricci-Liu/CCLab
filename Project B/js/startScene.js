let up = 1;
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

function preload() {
  rHead = loadImage("image/start/headR.png");
  rShell = loadImage("image/start/shellR.png");
  rMove = loadImage("image/start/moveR.png");
  rLeft = loadImage("image/start/leftR.png");
  rRight = loadImage("image/start/rightR.png");

  lHead = loadImage("image/start/headL.png");
  lShell = loadImage("image/start/shellL.png");
  lMove = loadImage("image/start/moveL.png");
  lLeft = loadImage("image/start/leftL.png");
  lRight = loadImage("image/start/rightL.png");
  
  sign =loadImage("image/start/heretostart.png");
  
}

function setup() {
  let a = createCanvas(1200, 600);
  a.parent("startScene");
}

function draw() {
  background(255);
  fill(50,s);
 noStroke();
 ellipse(x+imageSize/2.5,height*3/4+30+100,shadow,30);
  //shadow ellipse
  
  fill(50);
  ellipse(width-180,height*3/4+100,imageSize*1.2,imageSize/3);
  image(sign,width-380,height/2-30,220,250);

  if (r == true) {
    // fill(100);
    // ellipseMode(CORNERS);
    // ellipse(x + imageSize / 1.25,
    //   height - h / 5+imageSize,
    //   moveLeft,
    //   height - h /5 + imageSize);
  
    push();
    translate(0,H);
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
  
  if(H<-10){
    acc+=0.5;
    H+=acc;
    shadow+=3.3; // growing shadow;
  }
  //falling snail;

  
  

  if (keyIsPressed) {
    
    if (keyCode === LEFT_ARROW) {
      x -= 1;
      r = false;
      up++;
    moveLeft = x + 10 * sin(up * 0.05);
    } else if (keyCode === RIGHT_ARROW) {
      x += 3;
      r = true;
      up++;
    moveLeft = x + 10 * sin(up * 0.05);
    }
  } else {
    moveLeft = x;
  }

  if(x>840&&x<960){
  s = 0;
  if(x>900&&x<960){
    acc+=0.5;
    H+=acc;
  }
  }

  print(mouseX, mouseY);
}
