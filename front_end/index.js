let background_img;
let character;
let scoreListDiv = document.querySelector("#scorelist")
let scoresUl = document.createElement("ul")
let gems = [];
let f_gems = [];
let gameStarted = false;
let paused = true;
let paused_text;
let gameOverStatus = false;
let level = 1;
let start_button;
let save_button;
let end_button;
let restart_button;
let current_score = 0;
let myCanvas;
let fontRegular;
let song = new Audio("sounds/sonic.mp3")
let ding = new Audio("sounds/ding2.wav")
song.loop= true

function preload(){
    background_img = loadImage("images/forest_background.png");

    fontRegular = loadFont('fonts/Regular.ttf');
  
    getAllLanguages();
    scoreList();
}

function setup(){
    myCanvas = createCanvas(700,530);
    myCanvas.parent('canvasDiv')
    character = new Character;
    textSize(20);
    noLoop();
    startGame();
    
}

function draw(){
    
    background(background_img);
   
    drawScore();
    frames();
    drawGems();

    character.show();
    character.update();
    
}

function drawGems(){
    gems.forEach((language) => {
        language.show();
        language.update();

        if(language.hits(character)){
            // console.log('hit')
            gems.splice(0,1);
        }
        if(language.offscreen()){
            gems.splice(0,1);
        }
    })

}

function frames(){
    if (frameCount % 75 == 0) {
        gems.push(new Language(f_gems[randomNumber()]))
      }
}

function keyPressed(){
    
    // console.log(keyCode)
    if(keyCode === 32){
        character.up();
        character.brain_power -= 25;
    }
    if(keyCode === 16){
       pauseGame()
    }
}

function startGame(){
    start_button = createImg("images/play-64.png",'play')
    start_button.position(320,200);
    start_button.mousePressed(pressedStart);

}
function playAgain(){
    restart_button = createImg("images/play-64.png",'play')
    restart_button.position(320,200);
    restart_button.mousePressed(reloadPage);
}

function saveScore(){
    let text = createP("Please enter name");
    text.position(220, 265);
    text.class("scoreName");

    input = createInput();
    input.attribute('placeholder', 'Best Player');
    input.position(260, 340);
  
    button = createButton('submit');
    button.position(input.x + input.width+10, input.y);
    button.mousePressed(scoreRecorded);
  
   
}

function scoreRecorded(){
    const name = input.value()
    adaptor.postScore(name, current_score)
    .then(scoreArr => {
        scoreListDiv.innerHTML = ""
        highScoresH2 = document.createElement("h2")
        highScoresH2.innerText= "High Scores"
        scoreListDiv.append(highScoresH2)
        scoreArr.forEach(scoreObj => {
           let scoreLi = document.createElement("li")
           scoreLi.className = "scoreLi"
           scoreLi.innerText = `${scoreObj.player_name}: ${scoreObj.score}`
           scoresUl.append(scoreLi)
           scoreListDiv.append(scoresUl)
            
        });
    })
    
}

// function scoreList(){

//     adaptor.getScores()
//     .then(scoreArr => {
//         scoreArr.forEach(scoreObj => {
//            let scoreLi = document.createElement("li")
//            scoreLi.className = "scoreLi"
//            scoreLi.innerText = `${scoreObj.player_name}: ${scoreObj.score}`
//            scoresUl.append(scoreLi)
//            scoreListDiv.append(scoresUl)
            
//         });
//     })

// }

function pressedStart(){
    start_button.remove();
    countdown(6);
}

function countdown(mySeconds) {
    console.log(gameStarted)
   
    var seconds = mySeconds;
    timerText = createElement('p').addClass('timer');
    

    function tick() {
        ding.play();
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        const timer = document.getElementById("timer");
        timer.className = "timer"
        const game_instruction = document.getElementById('game-instruction');
        game_instruction.className = 'game_inst blinking'
        game_instruction.innerText = 'Be Ready to Press Space Bar'

        const pause_instruction = document.getElementById('pause-instruction');
        pause_instruction.className = 'pause_inst'
        pause_instruction.innerText = 'Press Shift to Pause'

        --seconds;
        timer.innerText = String(seconds);
    
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
            
        } else{
            if(seconds === 0){
                gameStarted = true;
                timer.remove();
                game_instruction.remove();
                pause_instruction.remove();
                song.play();
                loop();
            }
        }
    }
    tick();
}



function pressedSaveScore(){
    save_button.remove();
}

function gameOver(){
    gameOverStatus = true;
    song.pause();
    noLoop();
    let text = createP("Game Over!");
    text.position(160,30);
    text.class("gameOver");
    playAgain();
    saveScore();
    
}

function pauseGame(){
    // console.log(key)
    console.log(gameStarted)
    if(gameOverStatus === false && gameStarted === true){
        if(paused){
            paused = false;
            paused_text = createP("Paused");
            paused_text.position(200,30);
            paused_text.class("gameOver");
        
            song.pause()
            noLoop();
        }
        else{
            paused_text.remove();
            paused = true;
            song.play()
            loop();
        }
    }
}

function reloadPage(){
    window.location.reload();
}

function drawScore(){
    let c = color('#000000FF');
    let fontsize = 20;
    fill(c);
    textSize(fontsize);
    
    current_score = frameCount/6;
    if(current_score >= 500 && current_score < 700){
        level = 2;
    }else if(current_score >= 700 && current_score < 1000){
        level = 3;
    }
    text(`BRAIN POWER: ${character.brain_power}`, 10, 25)
    text(`SCORE: ${parseInt(current_score)}`,300,25)
    text(`LEVEL: ${level}`,550,25)

    if(character.brain_power <= 0){
        gameOver()
    }
}


let randomNumber = () => {
    return Math.floor(Math.random() * 8);
}

let getAllLanguages = () => {
    fetch("http://localhost:3000/language_gems")
    .then(resp => resp.json())
    .then(langArray => {
        f_gems = langArray
        // console.log(langArray);
    })
} 