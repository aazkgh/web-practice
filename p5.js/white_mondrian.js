function setup() {
    createCanvas(700, 550);
    //배경색 그라데이션
    gradient = createGradient(1500, 1250, color(252, 227, 235), color(92, 74, 69));
    frameRate(1);
}

function draw() {
    image(gradient, -400, -350);
    const RECT_NUM=280;

    for (let i=0; i<RECT_NUM; i++){
        let x = 20+random(-10,5)+(i%20)*35;
        let y = 20+random(-10,5)+floor(i/20)*35;
        let w = random(40,75);
        let h = random(40,75);

        //중심에 가까울수록 불투명
        let alpha = (abs(350 - x) * abs(275 - y) / (350 * 275) < 0.5) ? (1 - abs(350 - x) * abs(275 - y) / (350 * 275)) * 255 : 0;

        noStroke();
        fill(255,255,255,alpha);
        rect(x, y, w, h);
        
        stroke(106,78,66,alpha);
        strokeWeight(random(3, 5));

        let startX = random(x,x+w);
        let startY = random(y,y+h)
        line(x+random(-w/2,w/3),startY,x+w+random(-w/3,w/2),startY);
        line(startX,y+random(-h/2,h/3),startX,y+h+random(-h/3,h/2))
    }

    noLoop();
    }

    //그라데이션 객체 생성 함수
    function createGradient(w, h, c1, c2) {
    let maxRadius = dist(0, 0, w / 2, h / 2);
    let g = createGraphics(w, h);
    g.noStroke();
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
        let distance = dist(x, y, w / 2, h / 2);
        let inter = map(distance, 0, maxRadius, 0, 1);
        let c = lerpColor(c1, c2, inter);
        g.fill(c);
        g.rect(x, y, 1, 1);
        }
    }
    return g;
}