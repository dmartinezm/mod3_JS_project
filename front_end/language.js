class Language{

    constructor(langObject){
        this.langObject = langObject;
        this.x = width;
        this.y = random(height - character.soil_h);
        this.w = 32;
        this.h = 32;
        this.speed = 3;
        this.lang_image = loadImage(langObject.image);
        this.audio = new Audio ("sounds/ring.mp3")
        this.audio_no = new Audio ("sounds/oh_no_1.mp3")
    }

    show = () => {
        this.langObject.name == "Spaghetti" ? image(this.lang_image, this.x, this.y, this.w*2.5, this.h*2.5) : image(this.lang_image, this.x, this.y)
        
    }

    update = () => {
        this.x -= this.speed
    }

    offscreen = () => {
        if(this.x < -this.w){
            return true;
        }
        else{
            return false;
        }
    }
    
    hits = (character) => {

        if(this.y <= character.y + character.h && this.y + this.h >= character.y ){
            if(character.x + character.w >= this.x && character.x <= this.x + this.w){
                character.brain_power += this.langObject.value;
                console.log(this.langObject.value)
                if(this.langObject.name == "Spaghetti"){
                    this.audio_no.play()
                }else{
                    this.audio.play()
                }
                
        return true;
            }
        }
        else{
            return false;
        }
    }

}