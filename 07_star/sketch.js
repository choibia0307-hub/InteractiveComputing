let flapWidth = 15; // 12에서 약 1.2배 키움 (14.4 -> 15로 반올림)
let range = 200; 
let flaps = [];
let img;
let cols, rows;

function preload() {
  img = loadImage('별이빛나는밤.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  img.resize(windowWidth, windowHeight);
  buildFlaps();
}

function buildFlaps() {
  flaps = [];
  // 별이 커졌으므로 간격 배수(2.2)는 유지하여 겹침을 방지합니다.
  cols = ceil(width / (flapWidth * 2.2));
  rows = ceil(height / (flapWidth * 2.2));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * (flapWidth * 2.2);
      let y = j * (flapWidth * 2.2);
      let flap = new Flap(x, y);
      flaps.push(flap);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, windowHeight);
  buildFlaps();
}

function draw() {
  background(0);
  for (let flap of flaps) {
    flap.update();
    flap.show();
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

class Flap {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 0;
    this.currentSize = flapWidth;
    
    let ix = constrain(floor(this.x), 0, img.width - 1);
    let iy = constrain(floor(this.y), 0, img.height - 1);
    this.c = img.get(ix, iy);
  }

  show() {
    fill(this.c);
    push();
    translate(this.x, this.y);
    rotate(this.rad);
    drawStar(0, 0, this.currentSize / 2.5, this.currentSize, 5);
    pop();
  }

  update() {
    let distance = dist(mouseX, mouseY, this.x, this.y);

    if (distance < range) {
      // 마우스가 가까우면 기본 크기(15)에서 최대 3배까지 커짐
      this.currentSize = map(distance, 0, range, flapWidth * 3, flapWidth);
      this.rad = map(distance, 0, range, 0, TWO_PI);
    } else {
      this.currentSize = flapWidth; // 평상시 크기 15
      this.rad += 0.01;
    }
  }
}
