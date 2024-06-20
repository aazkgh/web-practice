let x = 1280/2;
let y = 720/2;
let direction = 'right';
let speed= 2;
let size = 200;
let randomHue;

function setup() {
  createCanvas(1280, 720);
  colorMode(HSB);
  randomHue = random(0, 360);
}

function draw() {
  background('black');
  
  fill(randomHue,100,100);
  noStroke();
  // 현재 이동 방향에 따라 PacMan의 방향을 결정
  if (direction === 'up') {
    arc(x, y, size, size, radians(-60), radians(240));
    y = y - speed;
    if(y<=0) direction = 'down';
  } else if (direction === 'left') {
    arc(x, y, size, size, radians(-150), radians(150));
    x = x - speed;
    if(x<=0) direction = 'right';
  } else if (direction === 'down') {
    arc(x, y, size, size, radians(-240), radians(60));
    y = y + speed;
    if(y>=height) direction = 'up';
  } else if (direction === 'right') {
    arc(x, y, size, size, radians(30), radians(-30));
    x = x + speed;
    if(x>=width) direction = 'left';
  }
  
  fill(100,100,0);
  //움직이는 방향에 따라 눈 위치 변화
  if(direction === 'left' || direction === 'right')
    circle(x,y-size*0.18,size*0.1);
  else if (direction === 'up' || direction === 'down')
    circle(x+size*0.18,y,size*0.1);
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    randomHue = random(0, 360);
  } else if (key === '-' || key === '_'){
    size *= 0.9;
  } else if (key === '=' || key === '+'){
    size *= 1.1;
  } else if (key === 'w' || key === 'W') {
    direction = 'up';
  } else if (key === 'a' || key === 'A') {
    direction = 'left';
  } else if (key === 's' || key === 'S') {
    direction = 'down';
  } else if (key === 'd' || key === 'D') {
    direction = 'right';
  }
}