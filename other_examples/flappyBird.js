

const cvs = document.querySelector("#flappyBird");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird.png";
// bird.onload = draw
bg.src = "images/bg.png";
// bg.onload = draw
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
// pipeNorth.onload = draw
pipeSouth.src = "images/pipeSouth.png";

// // the bird X and Y positions.
let bX = 10;
let bY = 150;

// the bird falls by 1.5 pixels at a time.
const gravity = 1.5;

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
let myReq;

function moveUp(){
    bY -= 20;
}
  
let spaceKey = false
document.addEventListener('keydown', function(e){
    // console.log(e.keyCode)
    if(e.keyCode === 32){
        if(spaceKey) return
        spaceKey = true
        moveUp()
    }
});

document.addEventListener('keyup', function () {
    spaceKey = false;
});



function drawBackGround(){
    ctx.drawImage(bg,0,0)
}

function drawBird(){
    ctx.drawImage(bird,bX,bY)
    bY += gravity
}

function drawPipeN(){
    ctx.drawImage(pipeNorth,100,0)
}

function drawScore(){
    ctx.fillStyle = '#000'
    ctx.font = '20px Verdana'
    ctx.fillText('Score : 0',10,20)
}

function gameOver(){
    const restartButton = document.querySelector('#btn')
    restartButton.innerText = 'Restart'
    restartButton.style.left = '200px'

    restartButton.addEventListener('click', () => {
        draw()
    })
   
}

function draw(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    drawBackGround()
    drawBird()
    drawScore()
  
    console.log(bY)
    if(bY + bird.height > cvs.height || bY  <= 0){
        // alert("GAME OVER");
        cancelAnimationFrame(myReq)
        // Reload the current page without the browser cache
        // If false or unspecified, the browser may reload the page from its HTTP cache
        // location.reload(true);
        gameOver()
    }
    else{
        
        myReq = requestAnimationFrame(draw) 
    }
    
    
}

draw()


// var interval = setInterval(draw,12);


// // gap; is the gap in pixels between the south Pipe and North Pipe.
// var gap = 85;

// // the constant is the south Pipe position, and it is calculating by adding the gap to the north Pipe.
// var constant;

// // we initiate the players score
// var score = 0;

// var pipe = [];

// pipe[0] = {
//   x : cvs.width,
//   y : 0
// };


