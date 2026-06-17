let t = 0;
const numLines = 55; 

let highColor = '#EF476F'; 
let lowColor = '#005F73';  


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


  for (let i = 0; i < numLines; i++) {
    
    let layerRatio = i / numLines;
    let baseY = map(layerRatio, 0, 1, -150, height + 150);
    
    // 삼각함수 파형(sin)으로 기본 대기 기류 생성
    let wave = sin(t * 1.5 + layerRatio * TWO_PI);

    let prevX = null;
    let prevY = null;
    let prevColor = null;

    for (let x = -20; x <= width + 20; x += 15) {
      
      let n = noise(x * 0.002, layerRatio * 1.5, t);
      
      let centerFactor = sin(map(x, 0, width, 0, PI));
      let noiseHeight = map(n, 0, 1, -200, 200) * centerFactor;
      
      // 기본 등고선 계산 좌표
      let currentY = baseY + noiseHeight + (wave * 10);
      let isoX = x + noiseHeight * 0.05;


      if (impactForce > 0.01) {
        let d = dist(isoX, currentY, clickX, clickY);
        
        if (d < 300) {
          let proximity = map(d, 0, 300, 1, 0);
          let smoothFactor = (1 + cos(map(proximity, 0, 1, PI, TWO_PI))) * 0.5;
			
          let interactionY = -110 * smoothFactor * impactForce;
          
          currentY += interactionY;

          noiseHeight += interactionY * 0.4;
        }
      }


      let elevationAmt = map(noiseHeight, 100, -160, 0, 1);
      elevationAmt = constrain(elevationAmt, 0, 1);
      
      let ptColor = lerpColor(color(lowColor), color(highColor), elevationAmt);

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


function mousePressed() {
  clickX = mouseX;
  clickY = mouseY;
  impactForce = 1.0; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}