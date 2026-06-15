let color = ['#ff0000', '#22ff00', '#4000ff']
rectMode(CENTER);


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(222);
  
  for (let x = 0; x<width+200; x+=200){
    for (let y = 0; y<height+1000; y+=150) {
      drawPattern(x,y) ;
    }
  }
 


  
}

function mousePressed() {
  background(222);
  for (let x = 0; x<width+200; x+=200){
    for (let y = 0; y<height+1000; y+=150) {
      drawPattern(x,y) ;
    }
  }
}

function drawPattern(x,y) {
	num = floor(random(9));
	if (num == 8) {
	  drawCircle2(x,y);
  } else if (num == 7) {
		drawSquare(x,y);
	} else if (num == 6) {
		drawLineSquare(x,y);
	} else if (num == 5) {
		drawRect(x,y);
	} else if (num == 4) {
		drawCircle(x,y);
	} else if (num == 3) {
		drawLineCircle(x,y) ;
	} else if (num == 2) {
	  drawEllipse(x,y);
	} else if (num == 1) {
		draw2line(x,y);
	} else {
		 drawline(x,y);
  }
	
}




function drawSquare(x,y) {
  noStroke();
  fill(random(color));
  square(x+50,y+50,100);
}

function drawLineSquare(x,y) {
  stroke(random(color));
  strokeWeight(15);
  noFill();
  square(x+50,y+50,90);
}

function drawRect(x,y) {
  noStroke();
  fill(random(color));
  rect(x,y+50,200,100);
}

function drawCircle(x,y) {
  noStroke();
  fill(random(color));
  ellipse(x+100,y+100,100);
}
function drawCircle2(x,y) {
  noStroke();
  fill(random(color));
  ellipse(x+100,y+100,70);
}

function drawLineCircle(x,y) {
  strokeWeight(15);
  stroke(random(color));
  noFill();
  ellipse(x+100,y+100,90);
}

function drawEllipse(x,y) {
  noStroke();
  fill(random(color));
  ellipse(x+100,y+100,140,100);
}

function draw2line(x,y) {
  noStroke();
  fill(random(color));
  rect(x,y+25*2,200,15*2);
  rect(x,y+60*2,200,15*2);
}

function drawline(x,y) {
  noStroke();
  fill(random(color));
  rect(x,y+42*2,100*2,16*2);
}








function draw() {

  
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	cols = ceil(width / w) + 1;
	rows = ceil(height / w) + 1;

	drawPattern();

}