class Character {

    constructor(){
        this.character_image = loadImage("images/brains.png")
        this.x = 64;
        this.y = 0;
        this.w = 50;
        this.h = 50;
        this.velocity = 0;
        this.gravity = 0.3;
        this.lift = -6;
        this.soil_h = 100;
        this.brain_power = 1000;
        this.score = 0;
    }

    show = () => {
        image(this.character_image,this.x,this.y, this.w,this.h);
    }

    up = () => {
        this.velocity += this.lift;
    }

    update = () => {
        this.velocity += this.gravity;
        // this will move the character downwards 
        this.y += this.velocity;
        // console.log(this.y, height - this.soil_h)
        if(this.y > height - this.soil_h ){
            this.y = height - this.soil_h;
            this.velocity = 0;
            gameOver();
            
        }

        if(this.y < 0){
            this.y = 0;
            this.velocity = 0;
        }
    }


}