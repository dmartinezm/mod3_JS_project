function Gem(){
    // this.langObject = langObject
    this.spacing = 175;
    this.y = random(height / 6, 3 / 4 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 32;
    this.h = 32;
    this.speed = 3;
    // this.img = loadImage(langObject.image)

    this.gY = height/2;
    this.gX = width;

    this.highlight = false;

    let img;
    img = loadImage("images/ruby.png");
    // let img2;
    // img2 = loadImage("images/html-5-icon.png");

    this.show = function(){
        // drawingContext.clearRect(this.gX,this.y, this.w, this.h)
        image(img,this.x,this.y);
        // image(img2,this.x,this.bottom)
    }

    this.update = function(){
        this.x -= this.speed
    }

    this.hits = function(){
        // console.log(this.gX, player.x)
        if(this.y <= player.y + player.h && this.y + this.h >= player.y ){
            if(player.x >= this.gX && player.x <= this.gX + this.w){
                return true;
            }
        }
        else{
            // console.log(this.y, player.y)
            return false;
        }

    }

    this.offscreen = function() {
        if (this.gX < -this.w) {
          return true;
        } else {
          return false;
        }
    }
}