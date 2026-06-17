let capture;
let prevFrame;

let squares = [];
let squareSize = 10;
let cols, rows;

let colors = [ '#ff0000','#ff7700','#0000ff','#00ffee', '#ffffff','#ff00ff', '#ffee00','#000000','#00ff00'];

function setup() {
  let winHeight = windowWidth * 240 / 320;
  createCanvas(windowWidth, winHeight);
  noStroke();

  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();

  // 🌟 [안전장치 1] setup에서 캠을 만들자마자 픽셀 배열을 강제로 활성화합니다.
  capture.loadPixels();

  prevFrame = capture.get(0, 0, capture.width, capture.height);
  prevFrame.loadPixels(); // 이전 프레임 배열도 안전하게 초기화

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
  // 🌟 [안전장치 2] 캠 데이터가 아직 들어오지 않았다면, 에러를 내지 않고 검은색을 반환합니다.
  if (!capture.pixels || capture.pixels.length === 0) {
    return color(0);
  }

  let cx = floor(map(x, 0, width, 0, capture.width));
  let cy = floor(map(y, 0, height, 0, capture.height));
  
  cx = constrain(cx, 0, capture.width - 1);
  cy = constrain(cy, 0, capture.height - 1);

  let index = (cx + cy * capture.width) * 4;
  let r = capture.pixels[index];
  let g = capture.pixels[index + 1];
  let b = capture.pixels[index + 2];
  
  return color(r, g, b);
}

function draw() {
  // 🌟 [안전장치 3] 웹캠 장치 부팅이 안 되어 크기가 0일 때는 연산을 대기시킵니다.
  if (capture.width === 0 || capture.height === 0) return;

  image(capture, 0, 0, width, height);

  capture.loadPixels();
  if (prevFrame && prevFrame.pixels) {
    prevFrame.loadPixels();
  }

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
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.isHighLight = false;
    this.highlightColor = color(255);
  }

  trigger() {
    this.isHighLight = true;
    this.w = random(50, 300);
    this.h = random(2, 15);

    let randomColor = random(colors);
    this.highlightColor = color(randomColor);
  }

  show() {
    if (this.isHighLight) {
      fill(this.highlightColor);
      rect(this.x - this.w / 2, this.y, this.w, this.h);
    } 
  }

  update() {
    if (this.isHighLight) {
      this.w -= 10;
      
      if (this.w <= 0) {
        this.w = 0;
        this.isHighLight = false;
      }
    }
  }

  isMoving() {
    // 🌟 [안전장치 4] 연산 도중 배열이 순간적으로 유실될 때를 대비해 체크합니다.
    if (!capture.pixels || !prevFrame || !prevFrame.pixels) return false;

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

    return dist(r, g, b, pr, pg, pb) > 120;
  }
}