function setup() {
createCanvas(960, 600);
frameRate(1);
}

function draw() {
background(220);

const RECT_NUM=160;
//색상을 랜덤하게 배치하기 위해 배열 활용
const order = Array.from({ length: RECT_NUM }, (_, index) => index);

for (let i=0; i<RECT_NUM; i++){
    let idx = floor(random(order.length));
    let data = order.splice(idx,1)[0];
    
    //한 row에 16개의 사각형 배치
    //고른 분포를 위해 사각형의 x좌표 값을 일정한 간격으로 배치함과 동시에 약간의 랜덤성 추가
    let x = random(30,80)+(data%16)*50;
    let y = random(25,50)+floor(data/16)*50;
    let w = random(60,100);
    let h = random(60,100);

    //중심에 가까울수록 불투명
    let alpha = (1-abs(445 - x)*abs(265-y) / (445*265))*255;
    if (i % 3 === 0) {
    fill(255,85,85,alpha);
    } else if (i % 3 === 1) {
    fill(64,162,216,alpha);
    } else {
    fill(255,214,86,alpha);
    }

    noStroke();
    rect(x, y, w, h);
    
    stroke('black');
    strokeWeight(random(5, 10));

    line(x+random(-w,w),y,x+w+random(-w,w),y);
    line(x+random(-w,w),y+h,x+w+random(-w,w),y+h);
    line(x,y+random(-h,h),x,y+h+random(-h,h));
    line(x+w,y+random(-h,h),x+w,y+h+random(-h,h));
}

noLoop();
}