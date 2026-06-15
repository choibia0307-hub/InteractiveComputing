let script = document.createElement('script');
script.src = 'https://unpkg.com/ml5@1.2.0/dist/ml5.min.js';
document.head.appendChild(script);

let video;
let handpose;
let hands = [];

// 바닥의 작은 사람 군집들을 위한 배열
let people = [];
let maxPeople = 250; 
let groundY;        

// 인터랙션 상태 제어 변수
let wasPinching = false;     
let flashTimer = 0;         
let arePeopleCollapsed = false; 

// 시네마틱 텍스트 인터랙션을 위한 타이머 데이터
let instructionsTimer = 0;   
const TRIGGER_DELAY = 60 * 5; // 🎯 [수정] 60프레임 * 5초 = 300프레임 (5초 대기 시간)

function preload() {
  handpose = ml5.handPose();
}

function setup() {
  window.focus();
  
  createCanvas(windowWidth, windowHeight);
  
  groundY = height - 60; 

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handpose.detectStart(video, gotResult);

  resetSimulation();
}

function gotResult(results) {
  hands = results;
}

function draw() {
  // ── [시퀀스 배경 설정] ──
  if (flashTimer > 0) {
    flashTimer--;
    if (flashTimer % 2 === 0) {
      background(255);
    } else {
      background(0, 50, 255); 
    }
  } else if (arePeopleCollapsed) {
    background(0, 20, 150); 
  } else {
    background(0); 
  }

  let targetX = width / 2;
  let targetY = groundY;
  let isHandDetected = false;

  // 1. [하늘의 손 트래킹] 
  if (hands.length > 0 && !arePeopleCollapsed) {
    let hand = hands[0];
    isHandDetected = true;

    instructionsTimer++;

    let mappedIndex = convertToCanvas(hand.index_finger_tip);
    targetX = mappedIndex.x;
    targetY = mappedIndex.y;

    // 엄지와 중지 끝의 거리 계산
    let thumbTip = hand.keypoints[4];
    let middleTip = hand.keypoints[12];
    let pinchDistance = dist(thumbTip.x, thumbTip.y, thumbTip.z || 0, middleTip.x, middleTip.y, middleTip.z || 0);

    let isPinching = pinchDistance < 28;

    if (!wasPinching && isPinching) {
      flashTimer = 14; 
      arePeopleCollapsed = true; 
    }
    wasPinching = isPinching; 

    // 5개 손가락별 뼈대 드로잉
    let fingers = [[0,1,2,3,4], [0,5,6,7,8], [0,9,10,11,12], [0,13,14,15,16], [0,17,18,19,20]];
    if (flashTimer > 0 && flashTimer % 2 === 0) stroke(0, 150);
    else stroke(255, 110);
    
    strokeWeight(1.5);
    noFill();
    for (let f = 0; f < fingers.length; f++) {
      let fingerPath = fingers[f];
      beginShape();
      for (let i = 0; i < fingerPath.length; i++) {
        let pt = convertToCanvas(hand.keypoints[fingerPath[i]]);
        vertex(pt.x, pt.y);
      }
      endShape();
    }

    // 관절 노드 포인트 드로잉
    noStroke();
    if (flashTimer > 0) {
      if (flashTimer % 2 === 0) fill(0, 200);
      else fill(255, 255);
    } else {
      fill(255, 180);
    }
    for (let i = 0; i < hand.keypoints.length; i++) {
      let pt = convertToCanvas(hand.keypoints[i]);
      ellipse(pt.x, pt.y, 5, 5); 
    }

    if (isPinching) {
      let tPt = convertToCanvas(thumbTip);
      let mPt = convertToCanvas(middleTip);
      fill(255, 0, 0);
      ellipse(tPt.x, tPt.y, 10, 10);
      ellipse(mPt.x, mPt.y, 10, 10);
      stroke(255, 0, 0);
    } else {
      stroke(0, 255, 0);       
    }
    strokeWeight(8);
    point(targetX, targetY);
  } else {
    if (!arePeopleCollapsed) {
      instructionsTimer = 0;
    }
  }

  // 지면 가이드라인
  if (flashTimer > 0) {
    if (flashTimer % 2 === 0) stroke(0, 60);
    else stroke(255, 100);
  } else if (arePeopleCollapsed) {
    stroke(255, 40); 
  } else {
    stroke(255, 30);
  }
  strokeWeight(1);
  line(0, groundY, width, groundY);

  // 2. [지상 군집] 실루엣 무리 업데이트 및 드로잉
  for (let p of people) {
    p.update(targetX, targetY, isHandDetected); 
    p.display();
  }

  // 3. 타이포그래피 가이드 시스템 호출
  drawCinematicNarrative(isHandDetected);
}

function drawCinematicNarrative(isHandDetected) {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  noStroke();
  
  if (flashTimer > 0) {
    if (flashTimer % 2 === 0) fill(0, 240);       
    else fill(255, 255);                          
  } else if (arePeopleCollapsed) {
    fill(255, 220); 
  } else {
    fill(255, 200);
  }

  if (arePeopleCollapsed) {
    textSize(24);
    textStyle(BOLD);
    text("PRESS 'ENTER' OR CLICK SCREEN TO RESTART THE WORLD", width / 2, height / 2);
  } 
  // 🎯 [수정] 하드코딩된 값 대신 위에서 정의한 TRIGGER_DELAY(300프레임)를 기준으로 텍스트 스위칭
  else if (isHandDetected && instructionsTimer >= TRIGGER_DELAY) {
    textSize(24);
    textStyle(BOLD);
    if (flashTimer === 0) fill(255, 60, 60); 
    text("SNAP YOUR FINGERS TO END THE WORLD", width / 2, height / 2);
  } 
  else {
    textSize(26);
    textStyle(NORMAL);
    text("OPEN YOUR HAND TO RULE THE WORLD", width / 2, height / 2);
  }
  pop();
}

function keyPressed() {
  if (keyCode === ENTER) {
    resetSimulation();
  }
}

function mousePressed() {
  window.focus(); 
  if (arePeopleCollapsed) {
    resetSimulation();
  }
}

function resetSimulation() {
  flashTimer = 0;
  arePeopleCollapsed = false;
  wasPinching = false;
  instructionsTimer = 0; 
  
  people = [];
  for (let i = 0; i < maxPeople; i++) {
    let spawnX = width / 2 + random(-80, 80);
    let spawnY = random(height * 0.3, height * 0.5);
    
    let tempPerson = new Person(spawnX, spawnY);
    tempPerson.isJumping = true;
    tempPerson.vel.y = random(0, 3); 
    
    people.push(tempPerson);
  }
}

class Person {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.maxSpeed = random(2.5, 5.5);   
    this.maxForce = random(0.2, 0.4);   
    
    this.bodyHeight = random(7, 12);     
    this.bodyWidth = random(3, 5);       
    this.headSize = this.bodyWidth * 0.75; 

    this.isJumping = false;
    this.gravity = 0.35;               
    
    this.collapseAngle = 0; 
    this.currentHeightMultiplier = 1.0; 
  }

  update(tx, ty, isHandDetected) {
    if (arePeopleCollapsed) {
      this.vel.mult(0);
      this.acc.mult(0);
      if (this.pos.y < groundY) {
        this.pos.y += 6;
        if (this.pos.y > groundY) this.pos.y = groundY;
      }
      if (this.collapseAngle < HALF_PI * 0.95) {
        this.collapseAngle += 0.15;
        this.currentHeightMultiplier -= 0.05; 
      }
      return; 
    }

    if (this.isJumping) {
      this.vel.y += this.gravity; 
      if (isHandDetected) {
        let xDiff = tx - this.pos.x;
        this.vel.x += sign(xDiff) * 0.15;
      } else {
        let xDiff = (width / 2) - this.pos.x;
        this.vel.x += sign(xDiff) * 0.05;
      }
      this.vel.x = constrain(this.vel.x, -this.maxSpeed, this.maxSpeed);

      if (this.pos.y >= groundY) {
        this.pos.y = groundY;
        this.vel.y = 0;
        this.vel.x = 0;
        this.isJumping = false; 
      }
    } 
    else if (!isHandDetected) {
      let homeTarget = createVector(width / 2, groundY);
      let desired = p5.Vector.sub(homeTarget, this.pos);
      let d = desired.mag();
      
      if (d < 40) {
        desired.setMag(map(d, 0, 40, 0, this.maxSpeed));
      } else {
        desired.setMag(this.maxSpeed);
      }
      
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      this.acc.add(steer);
    } 
    else {
      let target = createVector(tx, groundY); 
      let desired = p5.Vector.sub(target, this.pos);
      
      let d = desired.mag();
      if (d < 80) {
        desired.setMag(map(d, 0, 80, 0, this.maxSpeed));
      } else {
        desired.setMag(this.maxSpeed);
      }

      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      this.acc.add(steer);

      if (random(1) < 0.0004 && ty < groundY) {
        this.isJumping = true;
        let baseJumpPower = map(ty, groundY, 0, -4, -12, true); 
        let randomizedHeightMultiplier = random(0.4, 1.2); 
        this.vel.y = baseJumpPower * randomizedHeightMultiplier; 
        this.vel.x += random(-1.5, 1.5); 
      }
    }

    this.vel.add(this.acc);
    if (!this.isJumping) this.vel.limit(this.maxSpeed); 
    this.pos.add(this.vel);
    this.acc.mult(0); 

    this.pos.x = constrain(this.pos.x, 5, width - 5);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.collapseAngle);

    if (flashTimer > 0 && flashTimer % 2 === 0) fill(0);
    else fill(255);
    noStroke();
    
    let h = this.bodyHeight * max(this.currentHeightMultiplier, 0.2);
    beginShape();
    vertex(-this.bodyWidth / 2, 0);                 
    vertex(-this.bodyWidth * 0.4, -h); 
    vertex(this.bodyWidth * 0.4, -h);  
    vertex(this.bodyWidth / 2, 0);                  
    endShape(CLOSE);
    
    let headY = -h - (this.headSize / 2) - 0.5; 
    ellipse(0, headY, this.headSize, this.headSize);
    pop();
  }
}

function sign(val) {
  return val >= 0 ? 1 : -1;
}

function convertToCanvas(pt) {
  let invertedX = video.width - pt.x; 
  let x = map(invertedX, 0, video.width, 0, width);
  let y = map(pt.y, 0, video.height, 0, (width * video.height) / video.width);
  return createVector(x, y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  groundY = height - 60; 
}