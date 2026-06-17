let capture;
let prevFrame;

let squares = [];
let squareSize = 10;
let cols, rows;

let colors = [ '#ff0000','#ff7700','#0000ff','#00ffee', '#ffffff','#ff00ff', '#ffee00','#000000','#00ff00']

function setup() {
  let winHeight = windowWidth * 240 / 320;
  createCanvas(windowWidth, winHeight);
  // colorMode(HSB);
  noStroke();

  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();

  prevFrame = capture.get(0, 0, capture.width, capture.height);

  cols = ceil(width / squareSize);
  rows = ceil(height / squareSize);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * squareSize;
      let y = j * squareSize;
      let c = getColor(x, y);
      let csquare = new Square(x, y, c);
      squares.push(csquare);
    }
  }

}

function getColor(x, y) {
  let cx = floor(map(x, 0, width, 0, capture.width));
  let cy = floor(map(y, 0, height, 0, capture.height));
  let index = (cx + cy * capture.width) * 4;
  let r = capture.pixels[index];
  let g = capture.pixels[index + 1];
  let b = capture.pixels[index + 2];
  let c = color(r, g, b);

  // let c = capture.get(cx, cy);
  return c;
}

function draw() {
  
  image(capture, 0, 0, width, height);

  capture.loadPixels();
  prevFrame.loadPixels();

  for (let csquare of squares) {
    csquare.update();
    if (csquare.isMoving()) {
      csquare.trigger();
    }
    csquare.show();
  }

  prevFrame = capture.get(0, 0, capture.width, capture.height);

}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.isHighLight = false;
    this.highlightColor = color(255);
  }

  trigger() {
    this.isHighLight = true;
    this.w = random (50, 300);
    this.h = random (2,15);

    let randomColor = random(colors);
    this.highlightColor = color(randomColor)
  }

  show() {
    if (this.isHighLight) {
      fill (this.highlightColor);
      rect(this.x-this.w /2, this.y, this.w, this.h);
    } 
  }

  update() {

    if(this.isHighLight) {
      this.w-=10;
      
      if(this.w<=0) {
        this.w  = 0;
        this.isHighLight = false;
      }
    }
  }
  

  isMoving() {
    let cx = floor(map(this.x, 0, width, 0, capture.width));
    let cy = floor(map(this.y, 0, height, 0, capture.height));
    cx = constrain(cx, 0, capture.width - 1);
    cy = constrain(cy, 0, capture.height - 1);
    
    let index = (cx + cy * capture.width) * 4;
    let r = capture.pixels[index];
    let g = capture.pixels[index + 1];
    let b = capture.pixels[index + 2];
    let pr = prevFrame.pixels[index];
    let pg = prevFrame.pixels[index + 1];
    let pb = prevFrame.pixels[index + 2];

    return dist(r, g, b, pr, pg, pb) > 120
  }
    
}