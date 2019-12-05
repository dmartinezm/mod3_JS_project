let background_img;
let character;
let scoreListDiv = document.querySelector("#scorelist")
let scoresUl = document.createElement("ul")
let gems = [];
let f_gems = [];
let paused = true;
let level = 1;
let start_button;
let save_button;
let end_button;
let restart_button;
let current_score = 0;
let timer = 5;
let song = new Audio("sounds/sonic.mp3")
song.loop= true

function preload(){
    background_img = loadImage("images/forest_background.png");
    getAllLanguages()
    scoreList()
}

function setup(){
    var myCanvas = createCanvas(700,530);
    myCanvas.parent('canvasDiv')
    character = new Character;
    textSize(20)
    noLoop();
    startGame();
    
}

function draw(){
    
    background(background_img);
    text("Press Enter to Pause", 500, 500)
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
            console.log('hit')
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
    if(keyCode === 13){
       pauseGame()
    }
}

function startGame(){
    // start_button = createButton('Start Game');
    start_button = createImg("images/play-64.png",'play')
    start_button.position(300,265);
    start_button.mousePressed(pressedStart);

}
function playAgain(){
    restart_button = createButton('Play Again');
    restart_button.position(250,265);
    restart_button.mousePressed(reloadPage);
}

function saveScore(){
    // save_button = createButton('Save Score');
    // save_button.position(330,265);
    // save_button.mousePressed(pressedSaveScore);

    // let label = createP('Enter Name:');
    // label.position(200,265);
    // let input_field = createInput('');
    // input_field.position(330,265);

    input = createInput();
    input.position(200, 265);
  
    button = createButton('submit');
    button.position(input.x + input.width, input.y);
    button.mousePressed(scoreRecorded);
  
    greeting = createElement('h2', 'what is your name?');
    greeting.position(200, 205);
  
    textAlign(CENTER);
    textSize(50);
}
function scoreRecorded(){
    const name = input.value()
    adaptor.postScore(name, current_score)
    .then(scoreArr => {
        scoreArr.forEach(scoreObj => {
           let scoreLi = document.createElement("li")
           scoreLi.className = "scoreLi"
           scoreLi.innerText = `${scoreObj.player_name}: ${scoreObj.score}`
           scoresUl.append(scoreLi)
           scoreListDiv.append(scoresUl)
            
        });
    })
    
}
function scoreList(){

    adaptor.getScores()
    .then(scoreArr => {
        scoreArr.forEach(scoreObj => {
           let scoreLi = document.createElement("li")
           scoreLi.className = "scoreLi"
           scoreLi.innerText = `${scoreObj.player_name}: ${scoreObj.score}`
           scoresUl.append(scoreLi)
           scoreListDiv.append(scoresUl)
            
        });
    })

    // debugger
}
function pressedStart(){
    start_button.remove();
    song.play()
    //  let timerText = createP(timer);
    // timerText.position(width/2,height/2);
    
    loop();

}

function pressedSaveScore(){
    save_button.remove();
}

function gameOver(){
    song.pause()
    noLoop();
    let text = createP("Game Over!");
    text.position(200, 100);
    text.class("gameOver");
    playAgain();
    saveScore();
    
}

function pauseGame(){
    console.log(key)
    let pause_text;
    if(paused){
        paused = false;
        // pause_text = createP("Paused");
        // pause_text.position(300, 100);
        // pause_text.class("gameOver");
        song.pause()
        noLoop();
    }
    else{
        paused = true;
        song.play()
        loop();
    }
}

function reloadPage(){
    window.location.reload();
}

function drawScore(){
    let c = color('#F50834');
    let fontsize = 20;
    fill(c);
    textSize(fontsize);
    current_score = frameCount/2;
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