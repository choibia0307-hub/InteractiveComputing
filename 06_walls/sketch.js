let vine=[];
let colors = ['#f700ff', '#33ff00','#fffb00', '#ffffff']


function setup() {
  createCanvas(windowWidth, windowHeight);
  background('0');
  noStroke();
}

function mousePressed() {
  for( let i =0; i<10; i++) {
    vine.push(new Vine(mouseX,mouseY));
  }
}

function draw() {

  background(0,10);
  for (let i = 0; i < vine.length; i++) {
    let v = vine[i];
    if (v.isDone()) {
      vine.splice(i,1);
    } else {
    v.show();
    v.update();
  }
}

}

class Vine{
  constructor(x,y) {
  this.x = x;
  this.y = y;
  this.d = 10;
  this.h = 10;
  this.dx =0;
  this.dy =0;
  this.col = random(colors);

  }

  show() {
  
  fill(this.col);
  // ellipse(this.x, this.y,this.d);
  rect(this.x, this.y,this.d,this.h);

  }

  update(){

    this.x+=this.dx;
    this.y+=this.dy;


    this.dx += random(-1, 1);
    this.dy += random(-0.5,0.5);
    this.d *= random(1.005, 1.008);
    this.h *= random(1.04, 1.05);
  }

  isDone() {
    if(this.x>width || this.x <0 || this.y>height || this.y<0)  {
      return true;
    } else {
      return false ;
    }
    
  }
}
