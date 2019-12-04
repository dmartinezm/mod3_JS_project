function Player(){
    this.y = height/2;
    this.x = 64;
    this.w = 32;
    this.h = 32;
    this.img = loadImage("images/bird.png");
    this.brainpower = 0;
    this.score = 0;
    this.soil_h = 125;

    this.gravity = 0.3;
    this.lift = -6;
    this.velocity = 0;

    this.show = function(){
        // drawingContext.clearRect(0,0, this.w, this.h)
        // image(img,this.x,this.y, this.w, this.h);
        image(this.img,this.x,this.y);
    }

    this.up = function() {

        this.velocity += this.lift;
      }

    this.update = function(){
        this.velocity += this.gravity;
        // this.velocity *= 0.9;
        this.y += this.velocity;
       
        if(this.y > height - this.soil_h ){
          this.y = height - this.soil_h;
          this.velocity = 0;
      }
      
          if (this.y < 0) {
            // console.log('top')
            this.y = 0;
            this.velocity = 0;
          }
    }
}