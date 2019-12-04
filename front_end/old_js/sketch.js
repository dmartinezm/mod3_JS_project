let player;
let gem;
let gems = [];
let gems_original = []
let p_img;
let font;
let fontsize = 20;
let img;

gems_original = [{
    id: 1,
    name: "CSS",
    image: "imgs/css.png",
    value: 100,
    created_at: "2019-12-03T20:05:41.302Z",
    updated_at: "2019-12-03T20:05:41.302Z"
  }]


function setup() {
    img = loadImage("images/backg.jpeg");
    createCanvas(640, 480);
    player = new Player();
    // gem = new Gem()
    // gems.push(new Gem());
    // textFont(font);
    textSize(fontsize);
}

function draw(){

    background(img)
    drawScore()
    for(var i=gems.length-1; i>=0; i--){

        gems[i].show();
        gems[i].update();

        if (gems[i].hits(player)) {
            console.log("HIT");
            gems.splice(i,1);
        }

        if (gems[i].offscreen()) {
            gems.splice(i, 1);
        }
    }
    // gem.update()
    // gem.show()
    // gem.hits(player)

    player.update()
    player.show()

    if (frameCount % 75 == 0) {
        gems.push(new Gem());
        // console.log(gems_original[0])
        // gems.push(new Gem(gems_original[randomNumber()]))
        
      }
    
}

function drawScore(){
  fill(255);
  text('Score: ',10,25);

}

function keyPressed() {
    if (key == ' ') {
      player.up();
      //console.log("SPACE");
    }
}

let randomNumber = () => {
    return Math.floor(Math.random() * 7)
}

fetch("http://localhost:3000/language_gems")
    .then(resp => resp.json())
    .then(langArray => {
        gems_original = langArray
    })