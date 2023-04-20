alert('Hello!');

function setup(){
    let canvas = createCanvas(500,500);
    canvas.parent("canvasContainer");
    background(10);
}

function draw(){
    noStroke();
    fill(random(255),random(255),random(255),random(150));
    circle(random(width),random(height),random(40,100));
}