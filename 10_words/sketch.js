let inputStr = '';
let currentText = '';
let particles = [];
let isExploding = false;
let explodeTimer = 0;


const CHOSUNG = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const JUNGSUNG = ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ", "ㅐ", "ㅔ"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER, CENTER);
  frameRate(60);
}

function draw() {
  background(0);

  
  if (isExploding) {
    if (frameCount % 3 === 0) { // 생성 부하 조절
      for (let i = 0; i < 8; i++) {
        explodeText(currentText);
      }
    }
    explodeTimer--;
    if (explodeTimer <= 0) isExploding = false;
  }


  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show(); 
    
    if (p.isDone()) {
      particles.splice(i, 1);
    }
  }


  if (particles.length > 800) {
    particles.splice(0, particles.length - 800);
  }

  drawUI();
}

function drawUI() {
  push();
  noStroke();
  fill(255, 150);
  textSize(16);
  text(inputStr, width / 2, height - 80);
  
  fill(80);
  textSize(10);
  text("FPS: " + floor(frameRate()) + " | Particles: " + particles.length, 50, 20);
  pop();
}


function keyPressed() {
  if (keyCode === ENTER && inputStr.length > 0) {
    currentText = inputStr;
    isExploding = true;
    explodeTimer = 150;
    inputStr = '';
  } else if (keyCode === BACKSPACE) {
 
    inputStr = inputStr.substring(0, inputStr.length - 1);
  }
}


function keyTyped() {
  if (key !== 'Enter' && key !== 'Backspace') {
    inputStr += key;
  }
  return false;
}


function explodeText(str) {
  let char = str.charAt(floor(random(str.length)));
  let charCode = char.charCodeAt(0) - 44032;


  if (charCode >= 0 && charCode <= 11171) {
    addParticle(CHOSUNG[floor(charCode / 588)]);
    addParticle(JUNGSUNG[floor((charCode % 588) / 28)]);
  } else {
    addParticle(char);
  }
}

function addParticle(ch) {
 
  particles.push(new JamoParticle(random(width), -20, ch));
}

class JamoParticle {
  constructor(x, y, ch) {
    this.x = x;
    this.y = y;
    this.ch = ch;
    
  
    this.vx = random(-0.5, 0.5);
    this.vy = random(3, 7);
    this.g = 0.2; 
    
    this.size = random(15, 40);
    this.alpha = 255;
    this.c = color(random(180, 220), 220, 255); 
  }

  update() {
   
    this.vy += this.g;
    this.x += this.vx;
    this.y += this.vy;
    

    if (this.y > height * 0.7) {
      this.alpha = lerp(this.alpha, 0, 0.1);
    }
  }

  show() {
    push();
    translate(this.x, this.y);
  
    fill(red(this.c), green(this.c), blue(this.c), this.alpha);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.ch, 0, 0);
    pop();
  }

  isDone() {
    return this.y > height || this.alpha <= 1;
  }
}