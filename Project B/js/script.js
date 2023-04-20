function setup(){
 let canvas = createCanvas(600,700);
 canvas.parent("myContainer")
 background(100);
}

function draw(){
fill(random(255),100,100);
circle(random(width),random(height),100);

}