let snd;
let fft;
let bgGraphics;
let titleFont;
let titleGraphics;

const NOISE_SCALE = 0.006;

function preload() {
  soundFormats('mp3');
  snd = loadSound("Young K (DAY6) - let it be summer.mp3");
  titleFont = loadFont("한국기계연구원_bold.ttf");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  fft = new p5.FFT();
  
  // 배경으로 하늘 그래픽 설정
  bgGraphics = createGraphics(width, height);
  
  for (let y = 0; y < height; y++) {
    let ny = NOISE_SCALE * y * 2.5;
    for (let x = 0; x < width; x++) {
      let nx = NOISE_SCALE * x;
      let c = noise(nx, ny);
      
      let redVal = map(c, 0, 1, 90, 255);
      let greenVal = map(c, 0, 1, 200, 255);
      let alpha = map(c, 0, 1, 100, 200);  
      
      bgGraphics.stroke(redVal, greenVal, 255, alpha);
      bgGraphics.point(x, y);
    }
  }
  
  // 곡 제목 타이포 설정
  titleGraphics = createGraphics(width, height);
  titleGraphics.fill(255);
  titleGraphics.stroke(255);
  titleGraphics.strokeWeight(3);
  titleGraphics.textAlign(CENTER, CENTER);
  titleGraphics.textSize(86);
  titleGraphics.textFont(titleFont);

  // 텍스트 높이 계산
  let textHeight = titleGraphics.textAscent() - titleGraphics.textDescent();
  let textY = height/2 - textHeight/2;
  titleGraphics.text("let it be summer", width/2, textY);

  snd.play();
}

function draw() {
  image(bgGraphics, 0, 0);
  
  let wave = fft.waveform();
  let spectrum = fft.analyze();
  
  push();
  translate(width/2, height/2);
  
  // 선형 spectrum 그리기
  let barWidth = width/spectrum.length;
  for (let i = 0; i < spectrum.length; i++) {
    let lineX = map(i, 0, spectrum.length, -width/2, width/2);
    let lineY =  -height/6 + map(spectrum[i], 0, 255, height/6, 0); 
    let hueValue = map(i, 0, spectrum.length, 90, 140); 
    fill(hueValue, 67, 93); 
    noStroke();
    rect(lineX, 0, barWidth, lineY); 
  }
  
  // 원형 waveform 그리기
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    let angle = map(i, 0, wave.length, 0, 360);
    let radius = map(wave[i], -1, 1, 80, 320);
    let circleX = radius * cos(angle);
    let circleY = radius * sin(angle);
    noFill();
    stroke("#B60000");
    strokeWeight(5);
    vertex(circleX, circleY);
  }
  endShape(CLOSE);
  
  pop(); 
  
  image(titleGraphics, 0, 0);
}
