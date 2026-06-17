function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // 오브젝트를 화면 중앙에 맞추고, 화면 높이에 비례하여 크기 조절
  push();
  translate(width / 2, height / 2);

  // 원본 캔버스(990x1500)를 현재 화면 높이에 맞게 스케일링
  let scaleFactor = height / 1500;
  scale(scaleFactor);

  // 스케일링된 캔버스의 중앙으로 다시 이동
  translate(-990 / 2, -1500 / 2);

  //원
  //1번쨰 블럭
  //1번째 줄 
  fill(0);
  noStroke();
  ellipse(220+55, 265+55, 110);
  ellipse(330+55, 265+55, 110);
  ellipse(440+55, 265+55, 110);
  ellipse(550+55, 265+55, 110);
  ellipse(770+55, 265+55, 110);

  //2번쨰 줄 
  fill(55);
  noStroke();
  ellipse(55, 375+55, 110);
  ellipse(220+55, 375+55, 110);
  ellipse(440+55, 375+55, 110);
  ellipse(660+55, 375+55, 110);
  ellipse(770+55, 375+55, 110);

  fill(255);
  noStroke();
  rect(30, 265+110+30, 50);

  //3번째 줄 
  fill(110);
  noStroke();
  ellipse(110+55,485+55,110);
  ellipse(220+55,485+55,110);
  ellipse(330+55,485+55,110);
  ellipse(660+55,485+55,110);
  ellipse(770+55,485+55,110);
  ellipse(880+55,485+55,110);

  fill(255);
  noStroke();
  rect(880+30, 265+220+30, 50);
  


  //4번째 줄
  fill(165);
  noStroke();
  ellipse(55,595+55,110);
  ellipse(220+55,595+55,110);
  ellipse(330+55,595+55,110);

  fill(255);
  ellipse(330+55,595+55,70);

  fill(165);
  ellipse(440+55,595+55,110);
  ellipse(660+55,595+55,80);

  //5번째 줄
  fill(165+55);
  noStroke();
  ellipse(110+55, 595+110+55, 110 );
  ellipse(330+55, 595+110+55, 80);
  ellipse(440+55, 595+110+55, 110);
  ellipse(550+55, 595+110+55, 110);
  ellipse(770+55, 595+110+55, 110);


  //2번째 블럭
  //2-1번째 줄 
  fill(0);
  noStroke();
  ellipse(110+55, 705+110+55, 110);
  ellipse(330+55, 705+110+55, 110);
  ellipse(440+55, 705+110+55, 110);
  ellipse(550+55, 705+110+55, 110);
  ellipse(660+55, 705+110+55, 110);

  fill(255);
  ellipse(660+55,705+110+55,70);

  //2-2번째 줄 
  fill(55);
  noStroke();
  ellipse(110+55, 705+220+55, 110);
  ellipse(220+55, 705+220+55, 110);
  ellipse(440+55,  705+220+55, 110);
  ellipse(660+55,  705+220+55, 110);
  ellipse(880+55,  705+220+55, 110);

  //2-3번째 줄 
  fill(110);
  noStroke();
  ellipse(110+55,705+330+55,110);
  ellipse(220+55,705+330+55,110);
  ellipse(440+55,705+330+55,110);
  ellipse(550+55,705+330+55,110);
  ellipse(660+55,705+330+55,110);
  ellipse(880+55,705+330+55,110);
  
  //2-4번째 줄 
  fill(165);
  noStroke();
  ellipse(110+55,705+440+55,110);
  ellipse(220+55,705+440+55,110);
  ellipse(550+55,705+440+55,80);
  ellipse(660+55,705+440+55,110);
  ellipse(880+55,705+440+55,110);

  //2-5번째 줄 
  fill(165+55);
  noStroke();
  ellipse(110+55, 705+550+55, 80 );
  ellipse(220+55, 705+550+55, 110);
  ellipse(330+55, 705+550+55, 110);
  ellipse(550+55, 705+550+55, 110);
  ellipse(660+55, 705+550+55, 110);
  ellipse(880+55, 705+550+55, 80);


  //사각형 

  //1번째 블록 
  fill(0);
  noStroke();
  rect(660, 265, 110);

  fill(110);
  noStroke();
  rect(0,485,110);
  
  fill(165);
  noStroke();
  rect(770,595,110);

  fill(165+55);
  noStroke();
  rect(220, 595+110, 110 );

  //2번째 블럭 
  fill(55);
  noStroke();
  rect(550, 705+220, 110);

  fill(110);
  noStroke();
  rect(0, 705+330, 110);

  fill(255);
  noStroke();
  rect(110+30, 1035+30, 50);

  fill(165);
  noStroke();
  rect(440, 705+440, 110);

  fill(165+55);
  noStroke();
  rect(770, 705+550, 110);

  //반원
  fill(55);
  arc(330+55, 375+55, 110, 110, PI*3/2, PI/2);

  fill(55*4);
  arc(55, 375+330+55, 110, 110, PI*5/4, PI/4);

  fill(0);
  arc(220+55, 375+440+55, 110, 110, PI*7/4, PI*3/4);

  fill(110);
  arc(770+55, 375+660+55, 110, 110, 0, PI)

  //삼각형
  fill(0);
  noStroke();
  triangle(0, 265+110, 110, 265+110, 110, 265);

  fill(165+55);
  noStroke();
  triangle(660, 705, 770, 705, 660, 705+110);

  fill(165+55);
  noStroke();
  triangle(440, 705+550, 550, 705+550, 440, 705+660);

  fill(110);
  noStroke();
  triangle(440, 265+330, 440+55, 265+220, 550, 265+330);

  fill(0);
  noStroke();
  triangle(880, 705+220, 880+55, 705+110, 990, 705+220);


  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
