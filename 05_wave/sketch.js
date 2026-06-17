let colors = ['#d4d4d4aa', '#979797aa','#3f3f3faa','#000000aa']
let backcolors = ['#ffffff']


let w = 200;


let r = 0;
let dir = 1;



let arcs = [];
let cols, rows;



function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  cols = ceil(width / w) + 1;
  rows = ceil(height / w) + 1;



  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * w;
      let crossA = new CrossArcs(x, y);
      arcs.push(crossA);
    }

  }

}





function timer() {

  r +=3* dir;
  if (r > w || r < -w) {
    dir *= (-1);
  }

}



function draw() {

  background(255);
  
  

  for (let crossA of arcs) {
    crossA.show();
    crossA.update();

  }


  timer();
  
}


class CrossArcs {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 0;
    this.bottomCol = random(backcolors);
    this.col1 = random(colors);
    this.col2 = random(colors);
    this.col3 = random(colors);
    this.col4 = random(colors);



  }


  show() {

    push();
    translate(this.x, this.y);


    
    fill(this.bottomCol);
    rect(0, 0, w,w);

    fill(this.col1);
    arc(w, 0, this.rad, this.rad, PI / 2, PI);
    // arc(w, 0, this.rad*4/5, this.rad*4/5, PI / 2, PI);

    fill(this.col2);
    arc(w, w, this.rad, this.rad, -PI, -PI/2);
    // arc(w, 0, this.rad*4/5, this.rad*4/5, PI / 2, PI);

    fill(this.col3);
    arc(0, w, this.rad, this.rad, -PI / 2, 0);

    fill(this.col4);
    arc(0, 0, this.rad, this.rad, 0, PI/2);
    // arc(0, w, this.rad*4/5, this.rad*4/5, -PI / 2, 0);
    pop();


  }


  update() {

    this.rad = map(r, 0, w, 0, 2*w);
  }



}