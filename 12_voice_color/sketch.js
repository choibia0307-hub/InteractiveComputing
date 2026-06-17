let script = document.createElement('script');
script.src = 'https://unpkg.com/ml5@0.12.2/dist/ml5.min.js';
document.head.appendChild(script);

let classifier;
let label = '...';
let soundModel = 'https://teachablemachine.withgoogle.com/models/OVC0V0LeJ/';

let flyingParticles = []; 
let stainedPaints = [];   

// 마우스 타겟팅 및 충전을 위한 상태 변수
let isCharging = false;
let chargeTimer = 0;
let currentChargeColor;
let currentChargeTag = '';

// 세로형 커스텀 슬라이더 제어 데이터
let sliderX, sliderY, sliderW, sliderH;
let handleY;
let isDraggingSlider = false;
let spreadRadius = 0.22; // 기본 물감 분산 반경

// 각 색상별 세련된 아날로그 텍스처 컬러 팔레트 리스트
const colorPalettes = {
  '빨강': [
    { r: 255, g: 5,   b: 45 },  
    { r: 230, g: 15,  b: 20 },  
    { r: 255, g: 65,  b: 80 }   
  ],
  '노랑': [
    { r: 255, g: 210, b: 0 },   
    { r: 255, g: 230, b: 60 },  
    { r: 235, g: 170, b: 0 }    
  ],
  '파랑': [
    { r: 0,   g: 85,  b: 255 }, 
    { r: 0,   g: 50,  b: 180 }, 
    { r: 30,  g: 135, b: 240 }  
  ]
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(252, 251, 248); 
  noStroke();

  // 슬라이더 레이아웃 초기화 (우측 중앙 세로 배치)
  sliderW = 8;
  sliderH = 200;
  sliderX = width - 40;
  sliderY = height / 2 - sliderH / 2;
  handleY = map(spreadRadius, 0.05, 0.5, sliderY + sliderH, sliderY);

  classifier = ml5.soundClassifier(soundModel + 'model.json', modelReady);
}

function modelReady() {
  label = "마우스로 조준한 채 '빨강', '노랑', '파랑' 소리를 질러보세요!";
  classifier.classify(gotResult);
}

function draw() {
  background(252, 251, 248); 
  applyPaperTexture(); 

  if (isDraggingSlider) {
    handleY = constrain(mouseY, sliderY, sliderY + sliderH);
    spreadRadius = map(handleY, sliderY + sliderH, sliderY, 0.05, 0.5);
  }

  blendMode(MULTIPLY); 

  // 1. [정적 영역] 화면에 묻은 물감 자국들 처리
  for (let i = stainedPaints.length - 1; i >= 0; i--) {
    let stain = stainedPaints[i];
    stain.age += 1;
    
    let gravityForce = map(stain.age, 0, 300, 0.04, 0.52, true); 
    let lateralDrift = sin(stain.age * 0.05 + stain.noiseSeed) * 0.08; 
    stain.y += gravityForce;
    stain.x += lateralDrift;
    
    let nGrowth = constrain(norm(stain.age, 0, stain.growthDuration), 0, 1);
    let eGrowth = easeOutCirc(nGrowth); 
    
    if (stain.age > 300) {
      stain.currentAlpha -= 4.0;
    }
    
    if (stain.currentAlpha <= 0) {
      stainedPaints.splice(i, 1); 
      continue;
    }
    
    let c = color(red(stain.baseColor), green(stain.baseColor), blue(stain.baseColor), stain.currentAlpha);
    
    push();
    translate(stain.x, stain.y);
    rotate(stain.rotation); 
    fill(c);
    
    beginShape();
    for (let pt of stain.points) {
      let nForce = noise(pt.x * 0.05, pt.y * 0.05, stain.noiseSeed) * 7 * (1 - eGrowth);
      let edgeX = (pt.x + nForce) * eGrowth;
      let edgeY = (pt.y + nForce) * eGrowth;
      vertex(edgeX, edgeY);
    }
    endShape(CLOSE);
    
    for (let dot of stain.microDots) {
      let currentDist = dot.dist * eGrowth;
      let currentSize = dot.size * eGrowth;
      ellipse(cos(dot.angle) * currentDist, sin(dot.angle) * currentDist, currentSize, currentSize);
    }
    pop();
  }

  // 2. [충전 영역] 시각 연출
  if (isCharging) {
    chargeTimer += 1;
    blendMode(BLEND);
    push();
    noFill();
    
    let radiusVisualMultiplier = map(spreadRadius, 0.05, 0.5, 40, 250);
    for (let r = 0; r < 3; r++) {
      let ringSize = (noise(chargeTimer * 0.05 + r) * 40) + map(chargeTimer, 0, 60, radiusVisualMultiplier * 1.5, radiusVisualMultiplier * 0.3, true);
      stroke(red(currentChargeColor), green(currentChargeColor), blue(currentChargeColor), 120 - r * 30);
      strokeWeight(2);
      ellipse(mouseX, mouseY, ringSize, ringSize);
    }
    pop();
  } else {
    if (chargeTimer > 0) {
      triggerMouseTargetExplosion();
    }
  }

  // 3. [동적 영역] 물감 입자 처리
  blendMode(MULTIPLY); 
  for (let i = flyingParticles.length - 1; i >= 0; i--) {
    let p = flyingParticles[i];
    p.t += 1;
    
    let nFlight = constrain(norm(p.t, 0, p.duration), 0, 1);
    let eFlight = easeOutExpo(nFlight); 
    
    let currentX = lerp(p.startX, p.targetX, eFlight);
    let currentY = lerp(p.startY, p.targetY, eFlight);
    
    let arcEffect = sin(nFlight * PI) * p.arcHeight;
    p.x = currentX + cos(p.arcAngle) * arcEffect;
    p.y = currentY + sin(p.arcAngle) * arcEffect;
    
    if (nFlight >= 1) {
      let points = [];
      let numPoints = floor(random(25, 40)); 
      let baseR = p.size * random(0.6, 1.2); 
      
      for (let k = 0; k < numPoints; k++) {
        let a = map(k, 0, numPoints, 0, TWO_PI);
        let r = baseR * (random() < 0.15 ? random(2.0, 5.0) : random(0.8, 1.2));
        points.push({ x: cos(a) * r, y: sin(a) * r });
      }
      
      let microDots = [];
      let dotCount = floor(random(2, 10));
      for (let s = 0; s < dotCount; s++) {
        microDots.push({
          angle: random(TWO_PI),
          dist: baseR * random(1.5, 4.0),
          size: random(2, baseR * 0.4)
        });
      }

      stainedPaints.push({
        x: p.x + random(-10, 10),
        y: p.y + random(-10, 10),
        points: points,
        microDots: microDots,
        rotation: random(TWO_PI),
        baseColor: p.baseColor, 
        currentAlpha: p.initialAlpha, 
        age: 0, 
        growthDuration: random(15, 30),
        noiseSeed: random(1000)
      });
      
      flyingParticles.splice(i, 1);
      continue;
    }
    
    fill(p.color);
    ellipse(p.x, p.y, p.size * 0.5, p.size * 0.5);
  }

  // 4. UI 및 그래픽 요소 렌더링 레이어
  blendMode(BLEND); 
  
  let uiWidth = 800;          
  let uiHeight = 56;          
  let uiX = width / 2 - uiWidth / 2; 
  
  // 🌟 [수정 포인트] 상단 타이틀 폰트 높이(약 112px)에 꼬이지 않게 상태 박스 Y축을 140으로 하향 조정
  let uiY = 140;               
  
  fill(0, 0, 0, 160);
  rect(uiX, uiY, uiWidth, uiHeight, 8);
  fill(255);
  textSize(25);               
  textAlign(CENTER, CENTER);  
  text('현재 인식: ' + label, width / 2, uiY + uiHeight / 2);

  // 우측 중앙 커스텀 세로 슬라이더 인터페이스
  push();
  fill(0, 0, 0, 40);
  rect(sliderX - 4, sliderY - 15, sliderW + 8, sliderH + 30, 10); 
  
  stroke(0, 0, 0, 100);
  strokeWeight(2);
  line(sliderX + sliderW / 2, sliderY, sliderX + sliderW / 2, sliderY + sliderH);
  
  noStroke();
  if (isDraggingSlider) {
    fill(40, 40, 40); 
  } else {
    fill(90, 90, 90);
  }
  ellipse(sliderX + sliderW / 2, handleY, 20, 20);
  
  fill(80, 80, 80);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text("WIDE", sliderX + sliderW / 2, sliderY - 20);
  textAlign(CENTER, TOP);
  text("TIGHT", sliderX + sliderW / 2, sliderY + sliderH + 20);
  pop();

  if (frameCount % 15 === 0) {
    isCharging = false; 
  }
}

function applyPaperTexture() {
  push();
  blendMode(MULTIPLY);
  randomSeed(42); 
  for (let i = 0; i < width; i += 3) {
    for (let j = 0; j < height; j += 3) {
      if (random() < 0.12) {
        fill(235, 230, 220, 15); 
        rect(i, j, random(1, 3), random(1, 3));
      }
    }
  }
  pop();
}

function gotResult(error, results) {
  if (error) { console.error(error); return; }

  let top = results[0];
  let conf = top.confidence;

  if (conf < 0.45) return;

  if (top.label === '빨강' || top.label === '노랑' || top.label === '파랑') {
    isCharging = true; 
    currentChargeTag = top.label;
    label = `${top.label} 충전 중... (${nf(conf * 100, 1, 0)}%)`;

    let targetAlpha = map(conf, 0.45, 1.0, 15, 70);
    if (top.label === '빨강') currentChargeColor = color(255, 5, 45, targetAlpha);
    if (top.label === '노랑') currentChargeColor = color(255, 210, 0, targetAlpha);
    if (top.label === '파랑') currentChargeColor = color(0, 85, 255, targetAlpha);
  } else {
    label = top.label + ' (' + nf(conf * 100, 1, 0) + '%)';
  }
}

function drawMouseTargetExplosion() {
  let dynamicCountMin = map(spreadRadius, 0.05, 0.5, 30, 120);
  let dynamicCountMax = map(spreadRadius, 0.05, 0.5, 60, 200);
  let count = floor(map(chargeTimer, 1, 60, dynamicCountMin, dynamicCountMax, true));

  let radiusSizeFactor = map(spreadRadius, 0.05, 0.5, 0.5, 1.4);
  let sizeMultiplier = map(chargeTimer, 1, 60, 1.0, 1.8, true) * radiusSizeFactor;

  let startX, startY;
  if (currentChargeTag === '빨강') {
    startX = width / 2; startY = -40;
  } else if (currentChargeTag === '노랑') {
    startX = -40; startY = height + 40;
  } else if (currentChargeTag === '파랑') {
    startX = width + 40; startY = height + 40;
  }

  let activePalette = colorPalettes[currentChargeTag];

  for (let i = 0; i < count; i++) {
    let targetX = randomGaussian(mouseX, width * spreadRadius);
    let targetY = randomGaussian(mouseY, height * spreadRadius);
    
    let flightDuration = random(20, 50); 
    let randomSize = (random() < 0.85 ? random(8, 40) : random(40, 120)) * sizeMultiplier; 
    
    let pickedColorData = random(activePalette);
    let finalAlpha = currentChargeColor.levels[3]; 
    let particleColor = color(pickedColorData.r, pickedColorData.g, pickedColorData.b, finalAlpha);

    flyingParticles.push({
      startX: startX + random(-40, 40),
      startY: startY + random(-40, 40),
      targetX: targetX,
      targetY: targetY,
      x: startX, 
      y: startY,
      t: 0,
      duration: flightDuration,
      arcHeight: random(-150, 150), 
      arcAngle: atan2(targetY - startY, targetX - startX) + HALF_PI,
      size: randomSize, 
      color: particleColor,       
      baseColor: particleColor,   
      initialAlpha: finalAlpha
    });
  }

  chargeTimer = 0;
  label = "'빨강', '노랑', '파랑' 소리를 지르면 마우스 위치로 물감이 터져요.";
}

function triggerMouseTargetExplosion() {
  drawMouseTargetExplosion();
}

function mousePressed() {
  let d = dist(mouseX, mouseY, sliderX + sliderW / 2, handleY);
  if (d < 25) { 
    isDraggingSlider = true;
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sliderX = width - 40;
  sliderY = height / 2 - sliderH / 2;
  handleY = map(spreadRadius, 0.05, 0.5, sliderY + sliderH, sliderY);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}