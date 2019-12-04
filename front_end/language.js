class Language{

    constructor(langObject){
        this.langObject = langObject;
        this.x = width;
        this.y = random(height - character.soil_h);
        this.w = 32;
        this.h = 32;
        this.speed = 3;
        this.lang_image = loadImage(langObject.image);
    }

    show = () => {
        image(this.lang_image, this.x, this.y)
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
            if(character.x >= this.x && character.x <= this.x + this.w){
                character.brain_power += this.langObject.value;
                console.log(this.langObject.value)
                return true;
                
            }
        }
        else{
            // console.log(this.y, player.y)
            return false;
        }
    }

    // static getAllLanguages = () => {
    //     fetch("http://localhost:3000/language_gems")
    //     .then(resp => resp.json())
    //     .then(langArray => {
    //         return langArray   
    //     })
    // } 
}