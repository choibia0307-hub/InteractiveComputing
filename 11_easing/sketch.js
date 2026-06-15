let colors = ['#007b3d', '#002763', '#ff4800'];

// 이징 타임라인 제어용 변수
let duration = 90; // 한 번 회전할 때 걸리는 시간 (프레임 단위)

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#007b3d');
  noStroke();

  // 1단계: 타임라인 생성 및 정규화 (0.0 ~ 1.0)
  let t = frameCount % duration;
  let n = norm(t, 0, duration);
  
  // 2단계: 이징 함수 적용
  let easing = easeOutCubic(n);

  // 3단계: 현재 몇 번째 회전 단계인지 계산 (주기 구하기)
  let cycle = floor(frameCount / duration);

  // 4단계: 이징 변형 값을 실제 라디안 각도로 매핑
  // rad1은 시계 방향으로 90도(PI/2)씩 탁 탁 끊어지듯 회전
  let rad1 = (cycle * HALF_PI) + (easing * HALF_PI);
  // rad2는 반시계 방향으로 더 빠르게 180도(PI)씩 회전
  let rad2 = -(cycle * PI) - (easing * PI);


  // --- 첫 번째 파란색 도형 그룹 (배경 레이어) ---
  for (let x = 0; x < width + 200; x += 200) {
    for (let y = 0; y < height + 190; y += 190) {
      push();
      translate(x, y);
      rotate(rad2); // 이징이 적용된 각도
      fill('#002763');
      
      scale(3);
      beginShape();
      vertex(-35, -40);
      vertex(-34, -0.25);
      vertex(-12, 0.25);
      vertex(-34, 10);
      vertex(-35, 40);
      vertex(-0.15, 34.6);
      vertex(35, 40);
      vertex(34, 12);
      vertex(14, 0.74);
      vertex(35, -0.74);
      vertex(34.2, -40);
      vertex(-1.6, -34.6);
      vertex(-35, -40);
      endShape();
      pop();
    }
  }

  // --- 두 번째 주황색 도형 그룹 (전경 레이어) ---
  for (let x = 0; x < width + 200; x += 200) {
    for (let y = 0; y < height + 190; y += 190) {
      push();
      translate(x, y);
      rotate(rad1); // 이징이 적용된 각도
      fill('#ff4800');

      scale(1.1);
      beginShape();
      vertex(-100, -4);
      vertex(-12, 134);
      vertex(47, 83);
      vertex(12, 38);
      vertex(90, 58);
      vertex(100, -28);
      vertex(22, -28);
      vertex(72, -90);
      vertex(-7, -134);
      vertex(-100, -4); // 괄호 줄바꿈 오류 수정
      endShape();
      pop();
    }
  }
}

// 처음엔 빠르고 끝에는 완전히 감속하며 멈추는 이징 함수
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}