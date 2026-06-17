function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  noStroke();

  // 오브젝트를 화면 중앙에 맞추고, 화면 높이에 비례하여 크기 조절
  push();
  translate(width / 2, height / 2);

  // 원본 캔버스(1200x1200)를 현재 화면 높이에 맞게 스케일링
  let scaleFactor = height / 1200;
  scale(scaleFactor);

  // 스케일링된 캔버스의 중앙으로 다시 이동
  translate(-1200 / 2, -1200 / 2);

  // ==========================================
  // 노여움 (Anger)
  // ==========================================
  fill('#b00000');
  rect(600, 0, 600, 600);

  // 2번째줄
  let gradient3 = drawingContext.createLinearGradient(900, 60, 1200, 60);
  gradient3.addColorStop(0.15, '#b00000');
  gradient3.addColorStop(0.5, '#ff0000');
  gradient3.addColorStop(0.75, '#d9d9d9');
  gradient3.addColorStop(1, '#d9d9d9');
  drawingContext.fillStyle = gradient3;
  triangle(900, 0, 1200, 60, 900, 120);
  triangle(900, 120 * 1, 1200, 60 + 120 * 1, 900, 120 + 120 * 1);
  triangle(900, 120 * 2, 1200, 60 + 120 * 2, 900, 120 + 120 * 2);
  triangle(900, 120 * 3, 1200, 60 + 120 * 3, 900, 120 + 120 * 3);
  triangle(900, 120 * 4, 1200, 60 + 120 * 4, 900, 120 + 120 * 4);

  // 1번째줄
  let gradient1 = drawingContext.createLinearGradient(600, 60, 900, 60);
  gradient1.addColorStop(0.15, '#b00000');
  gradient1.addColorStop(0.50, '#ff0000');
  gradient1.addColorStop(0.75, '#d9d9d9');
  gradient1.addColorStop(1, '#d9d9d9');
  drawingContext.fillStyle = gradient1;
  triangle(600, 0, 900, 60, 600, 120);
  triangle(600, 120 * 1, 900, 60 + 120 * 1, 600, 120 + 120 * 1);
  triangle(600, 120 * 2, 900, 60 + 120 * 2, 600, 120 + 120 * 2);
  triangle(600, 120 * 3, 900, 60 + 120 * 3, 600, 120 + 120 * 3);
  triangle(600, 120 * 4, 900, 60 + 120 * 4, 600, 120 + 120 * 4);


  // ==========================================
  // 슬픔 (Sadness) - 🌟 클리핑 마스크 적용 영역
  // ==========================================
  push(); // 슬픔 영역 전용 클리핑 장벽을 세우기 위해 push()
  
  // 1. 먼저 자를 경계선 사각형(0, 600 좌표에 600x600 사이즈) 패스를 생성합니다.
  drawingContext.beginPath();
  drawingContext.rect(0, 600, 600, 600);
  // 2. 이 사각형 바깥으로 나가는 모든 드로잉을 가차없이 커팅(Clip)합니다.
  drawingContext.clip();

  // 바탕 바탕색 채우기
  fill('#5353CE');
  rect(0, 600, 600, 600);

  let gradient4 = drawingContext.createLinearGradient(0, 600, 0, 800);
  gradient4.addColorStop(0, '#afafe9');
  gradient4.addColorStop(0.50, '#5353ce');
  gradient4.addColorStop(1, '#2a2a68');
  drawingContext.fillStyle = gradient4;
  ellipse(0, 600 + 100, 170, 200);
  ellipse(300, 600 + 100, 170, 200);
  ellipse(600, 600 + 100, 170, 200);

  let gradient5 = drawingContext.createLinearGradient(0, 800, 0, 1000);
  gradient5.addColorStop(0, '#afafe9');
  gradient5.addColorStop(0.50, '#5353ce');
  gradient5.addColorStop(1, '#2a2a68');
  drawingContext.fillStyle = gradient5;
  ellipse(0, 800 + 100, 170, 200);
  ellipse(300, 800 + 100, 170, 200);
  ellipse(600, 800 + 100, 170, 200);

  let gradient6 = drawingContext.createLinearGradient(0, 1000, 0, 1200);
  gradient6.addColorStop(0, '#afafe9');
  gradient6.addColorStop(0.50, '#5353ce');
  gradient6.addColorStop(1, '#2a2a68');
  drawingContext.fillStyle = gradient6;
  ellipse(0, 1000 + 100, 170, 200);
  ellipse(300, 1000 + 100, 170, 200);
  ellipse(600, 1000 + 100, 170, 200);

  let gradient7 = drawingContext.createLinearGradient(0, 600 - 100, 0, 600 + 100);
  gradient7.addColorStop(0, '#afafe9');
  gradient7.addColorStop(0.50, '#5353ce');
  gradient7.addColorStop(1, '#2a2a68');
  drawingContext.fillStyle = gradient7;
  ellipse(65 + 170 / 2, 600, 170, 200);
  ellipse(600 - 65 - 170 / 2, 600, 170, 200);

  let gradient8 = drawingContext.createLinearGradient(0, 700, 0, 900);
  gradient8.addColorStop(0, '#afafe9');
  gradient8.addColorStop(0.50, '#5353ce');
  gradient8.addColorStop(1, '#2a2a68');
  drawingContext.fillStyle = gradient8;
  ellipse(65 + 170 / 2, 800, 170, 200);
  ellipse(600 - 65 - 170 / 2, 800, 170, 200);

  let gradient9 = drawingContext.createLinearGradient(0, 900, 0, 1100);
  gradient9.addColorStop(0, '#afafe9');
  gradient9.addColorStop(0.50, '#5353ce');
  gradient9.addColorStop(1, '#2a2a68');
  drawingContext.fillStyle = gradient9;
  ellipse(65 + 170 / 2, 1000, 170, 200);
  ellipse(600 - 65 - 170 / 2, 1000, 170, 200);

  let gradient10 = drawingContext.createLinearGradient(0, 1100, 0, 1300);
  gradient10.addColorStop(0, '#afafe9');
  gradient10.addColorStop(0.50, '#5353ce');
  gradient10.addColorStop(1, '#2a2a68');
  drawingContext.fillStyle = gradient10;
  ellipse(65 + 170 / 2, 1200, 170, 200);
  ellipse(600 - 65 - 170 / 2, 1200, 170, 200);

  pop(); // 🌟 중요: 슬픔 영역이 끝났으므로 클리핑 마스크 제한을 해제합니다.


  // ==========================================
  // 두려움 (Fear)
  // ==========================================
  let gradient2 = drawingContext.createLinearGradient(900, 600, 900, 1200);
  gradient2.addColorStop(1, '#E79A00');
  gradient2.addColorStop(0.57, '#9D6900');
  gradient2.addColorStop(0.30, '#38260A');
  gradient2.addColorStop(0, '#000000');

  drawingContext.fillStyle = gradient2;
  rect(600, 600, 600, 600);

  fill(0, 0, 0, 60);
  ellipse(600 + 40, 600 + 40, 80);
  ellipse(600 + 40, 600 + 40 * 2, 80);
  ellipse(600 + 40, 600 + 40 * 3, 80);
  ellipse(600 + 40, 600 + 40 * 4, 80);
  ellipse(600 + 40, 600 + 40 * 5, 80);
  ellipse(600 + 40, 600 + 40 * 6, 80);

  ellipse(710 + 50, 600 + 50 * 1, 100);
  ellipse(710 + 50, 600 + 50 * 2, 100);
  ellipse(710 + 50, 600 + 50 * 3, 100);
  ellipse(710 + 50, 600 + 50 * 4, 100);
  ellipse(710 + 50, 600 + 50 * 5, 100);
  ellipse(710 + 50, 600 + 50 * 6, 100);
  ellipse(710 + 50, 600 + 50 * 7, 100);
  ellipse(710 + 50, 600 + 50 * 8, 100);
  ellipse(710 + 50, 600 + 50 * 9, 100);
  ellipse(710 + 50, 600 + 50 * 10, 100);

  ellipse(820 + 70, 600 + 70 * 1, 140);
  ellipse(820 + 70, 600 + 70 * 2, 140);
  ellipse(820 + 70, 600 + 70 * 3, 140);
  ellipse(820 + 70, 600 + 70 * 4, 140);
  ellipse(820 + 70, 600 + 70 * 5, 140);

  ellipse(1040 + 60, 600 + 60 * 1, 120);
  ellipse(1040 + 60, 600 + 60 * 2, 120);
  ellipse(1040 + 60, 600 + 60 * 3, 120);
  ellipse(1040 + 60, 600 + 60 * 4, 120);
  ellipse(1040 + 60, 600 + 60 * 5, 120);
  ellipse(1040 + 60, 600 + 60 * 6, 120);
  ellipse(1040 + 60, 600 + 60 * 7, 120);
  ellipse(1040 + 60, 600 + 60 * 8, 120);
  ellipse(1040 + 60, 600 + 60 * 9, 120);
  ellipse(1040 + 60, 600 + 60 * 10, 120);


  // ==========================================
  // 기쁨 (Joy)
  // ==========================================
  fill('#B9FFA1');
  rect(0, 0, 600, 600);

  let gradient11 = drawingContext.createRadialGradient(300, 130, 25, 300, 130, 400);
  gradient11.addColorStop(0, '#fff34c');
  gradient11.addColorStop(0.3, '#fff78e');
  gradient11.addColorStop(0.85, '#ebffe2');
  gradient11.addColorStop(1, '#dcffcf');
  drawingContext.fillStyle = gradient11;

  beginShape();
  vertex(300, 0);
  bezierVertex(150, 0, 0, 250, 0, 400);
  bezierVertex(0, 600, 200, 600, 300, 600);
  bezierVertex(400, 600, 600, 600, 600, 400);
  bezierVertex(600, 250, 450, 0, 300, 0);
  endShape();

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}