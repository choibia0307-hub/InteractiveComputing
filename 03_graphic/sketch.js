
let rad1 = 0;
let rad2 = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x=width/2;
  y=height/2;
}

function draw() {
  background('#007b3d');
  noStroke();

  

  for (let x = 0; x < width+1000; x += 200) {
    for (let y = 0; y < height+1000; y+=190) {
      push();
      translate(x, y);

      rotate(rad2);
      fill('#002763');

      
      scale(3);
      beginShape();
      vertex(-35,-40);
      vertex(-34,-0.25);
      vertex(-12,0.25);
      vertex(-34,10);
      vertex(-35,40);
      vertex(-0.15,34.6);
      vertex(35,40);
      vertex(34,12);
      vertex(14,0.74);
      vertex(35,-0.74);
      vertex(34.2,-40);
      vertex(-1.6,-34.6);
      vertex(-35,-40);
      endShape();
      pop();

      }
    
  }

  for (let x = 0; x < width+1000; x += 200) {
    for (let y = 0; y < height+1000; y+=190) {
      push();
      translate(x, y);

      rotate(rad1);
      fill('#ff4800');

      
      scale(1.1);
      beginShape();
      vertex(-100,-4);
      vertex(-12,134);
      vertex(47,83);
      vertex(12,38);
      vertex(90,58);
      vertex(100,-28);
      vertex(22,-28);
      vertex(72,-90);
      vertex(-7,-134);
      vertex(-100,-4
      );
      endShape();
      pop();

      }
    
  }

  rad1 += PI/360;
  rad2 -= PI/180;
}
