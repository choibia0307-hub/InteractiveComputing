let t = 0;
const numLines = 55; // 화면 전체를 여백 없이 꽉 채우는 밀도 유지

// 높은 곳(붉은색)과 낮은 곳(파란색)의 확실한 대비
let highColor = '#EF476F'; // 산봉우리 : 코랄 핑크 (붉은빛)
let lowColor = '#005F73';  // 골짜기 : 딥 블루 (파란빛)

// [인터랙션 변수]
let clickX = -1000; 
let clickY = -1000;
let impactForce = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10, 12, 18); 

  // 클릭 에너지를 서서히 감소시킴
  impactForce = lerp(impactForce, 0, 0.04);

  // 화면 위쪽 바깥부터 아래쪽 바깥까지 꽉 차게 렌더링
  for (let i = 0; i < numLines; i++) {
    
    let layerRatio = i / numLines;
    let baseY = map(layerRatio, 0, 1, -150, height + 150);
    
    // 삼각함수 파형(sin)으로 기본 대기 기류 생성
    let wave = sin(t * 1.5 + layerRatio * TWO_PI);

    let prevX = null;
    let prevY = null;
    let prevColor = null;

    for (let x = -20; x <= width + 20; x += 15) {
      
      // [새로 배운 내용: 3차원 펄린 노이즈 지형]
      let n = noise(x * 0.002, layerRatio * 1.5, t);
      
      // 화면 중앙부 기본 고도 가중치
      let centerFactor = sin(map(x, 0, width, 0, PI));
      let noiseHeight = map(n, 0, 1, -200, 200) * centerFactor;
      
      // 기본 등고선 계산 좌표
      let currentY = baseY + noiseHeight + (wave * 10);
      let isoX = x + noiseHeight * 0.05;

      // 🖱️ [인터랙션: 클릭 지점 기준 스무스 Y축 제어 - 1.2배 증폭 적용]
      if (impactForce > 0.01) {
        let d = dist(isoX, currentY, clickX, clickY);
        
        // 🔥 영향 반경을 기존 250에서 300으로 1.2배 확장하여 더 넓은 능선이 함께 움직임
        if (d < 300) {
          let proximity = map(d, 0, 300, 1, 0);
          let smoothFactor = (1 + cos(map(proximity, 0, 1, PI, TWO_PI))) * 0.5;
          
          // 🔥 솟아오르는 힘의 한계치를 기존 -90에서 -110으로 약 1.2배 강력하게 업그레이드!
          let interactionY = -110 * smoothFactor * impactForce;
          
          currentY += interactionY;
          
          // 변형된 고도 정보를 색상 연산에 실시간 반영
          noiseHeight += interactionY * 0.4;
        }
      }

      // [고도에 따른 색상 보간 연산]
      let elevationAmt = map(noiseHeight, 100, -160, 0, 1);
      elevationAmt = constrain(elevationAmt, 0, 1);
      
      let ptColor = lerpColor(color(lowColor), color(highColor), elevationAmt);

      // 개별 line() 드로잉으로 실시간 색상 그라데이션 완벽 분리
      if (prevX !== null) {
        strokeWeight(map(elevationAmt, 0, 1, 1.0, 2.2));
        
        let edgeColor = lerpColor(prevColor, ptColor, 0.5);
        stroke(edgeColor);
        
        line(prevX, prevY, isoX, currentY);
      }

      prevX = isoX;
      prevY = currentY;
      prevColor = ptColor;
    }
  }

  t += 0.005;
}

// 클릭하는 순간에만 좌표와 에너지 장전
function mousePressed() {
  clickX = mouseX;
  clickY = mouseY;
  impactForce = 1.0; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}