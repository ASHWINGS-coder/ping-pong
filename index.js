var rods = document.getElementsByClassName('rods');
var ball = document.getElementById('ball');
window.addEventListener('keypress', moveRods);
var interval = setInterval(moveBall, 10);

var flagT = 0;
var flagW = 0;
var blu = 3 + Math.floor(Math.random() * 4);
var score_count = 0;
var start = 0;

function setBallLeft(bl, bw, ww){
    if(!flagW){
        bl = bl + blu;
        if(bl + bw >= ww){
            bl = ww - bw;
            flagW = 1;
            blu = 3 + Math.floor(Math.random() * 4);  
        }
    }
    else{
        bl = bl - blu;
        if(bl < 0){
            bl = 0;
            flagW = 0;
            blu = 3 + Math.floor(Math.random() * 4); 
        }
    }
    return bl;
}

function setBallTop(bt, bh, r1_h, r2_h, wh){
    if(!flagT){
        bt = bt - 2;
        if(bt < r1_h){
            bt = r1_h;
            flagT = 1;
        }
    }
    else{
        bt = bt + 2;
        if(bt > (wh - r2_h - bh)){
            bt = wh - r2_h - bh;
            flagT = 0;
        }
    }
    return bt;
}

function hitRodOne(bl, bt, r1_l, r1_w, r1_h){
    if((bl+5 >= r1_l && bl-5 <= r1_l + r1_w && bt <= r1_h) || (bt > r1_h))
        return true;
    return false;
}

function hitRodTwo(bl, bt, bh, r2_l, r2_w, r2_h, wh){
    if((bl+5 >= r2_l && bl-5 <= r2_l + r2_w && bt >= (wh - r2_h - bh)) || (bt < (wh - r2_h - bh)))
        return true;
    return false;
}

function moveBall() {
    let bt = parseInt(ball.getBoundingClientRect().top);
    let bl = parseInt(ball.getBoundingClientRect().left);
    let bw = parseInt(ball.getBoundingClientRect().width);
    let bh = parseInt(ball.getBoundingClientRect().height);
    let r1_t = parseInt(rods[0].getBoundingClientRect().top);
    let r1_l = parseInt(rods[0].getBoundingClientRect().left);
    let r1_w = parseInt(rods[0].getBoundingClientRect().width);
    let r1_h = parseInt(rods[0].getBoundingClientRect().height);
    let r2_t = parseInt(rods[1].getBoundingClientRect().top);
    let r2_l = parseInt(rods[1].getBoundingClientRect().left);
    let r2_w = parseInt(rods[1].getBoundingClientRect().width);
    let r2_h = parseInt(rods[1].getBoundingClientRect().height);
    let ww = parseInt(window.innerWidth);
    let wh = parseInt(window.innerHeight);

    bl = setBallLeft(bl, bw, ww);
    bt = setBallTop(bt, bh, r1_h, r2_h, wh);
    
    let hitR1 = hitRodOne(bl, bt, r1_l, r1_w, r1_h);
    let hitR2 = hitRodTwo(bl, bt, bh, r2_l, r2_w, r2_h, wh);

    if(!hitR1 || !hitR2){
        if(!hitR1 && bt <= r1_h){
            //bt = 0;
            ball.style.display = "none";
            alert("You have scored ", score_count, " points");
            clearInterval(interval);
        }
        else if(!hitR2){
            //bt = wh - bh;
            ball.style.display = "none";
            let msg = "You have scored "+score_count+ " points";
            alert(msg);
            clearInterval(interval);
        }
    }

    ball.style.left = bl + "px";
    ball.style.top = bt + "px";
    score_count++;
}



function moveRods(event) {
    // if(event.keyCode == 13 && start == 0){
    //     start = 1;
    // }
    // else if(start == 0){
    //     return;
    // }
    let left = rods[0].getBoundingClientRect().left;
     console.log("function move rods",event.keyCode);

    let ww = parseInt(window.innerWidth);
    let inc = ww*0.01;

    if (event.keyCode == 97) {
        if (left > 0) {
            left = left - inc;
        }
    }
    else if (event.keyCode == 100) {
        if (left <= (window.innerWidth - rods[0].offsetWidth)) {
            left = left + inc;
        }
    }
    for (let i = 0; i < rods.length; i++) {
        rods[i].style.left = left + "px";
    }
}
