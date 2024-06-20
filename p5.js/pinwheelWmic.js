let mic;
let angle1 = 0;
let angle2 = 60;

function setup() {
  createCanvas(800, 400);
  colorMode(HSB, 360);
  
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(360);
  let vol = mic.getLevel(); // 마이크 입력의 볼륨을 가져옴
  let speed = map(vol, 0, 1, 0, 180); // 볼륨을 회전 속도로 매핑

  drawPinwheel(200, 200, angle1, 200, 40); // 첫 번째 핀휠
  angle1 += speed;

  drawPinwheel(600, 200, angle2, 160, 25); // 두 번째 핀휠
  angle2 += speed;
}

function drawPinwheel(x, y, angle, startHue, hueIncrement) {
  translate(x, y);
  noStroke();
  for (let i = 0; i < 4; i++) {
    fill(startHue + hueIncrement * i, 360, 360);
    push();
    rotate(radians(angle));
    arc(100, 0, 200, 200, radians(0), radians(180));
    pop();
    rotate(radians(90));
  }
  translate(-x, -y); // 원점으로 되돌림
}
