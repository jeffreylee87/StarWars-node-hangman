var Letter = function (char) {
    
    this.char = char;
    this.guessed = false;
    this.convert = function () {
        if (this.char == 0) {
            this.guessed = true;
            return " ";
            
        } if (this.guessed === false){
            this.char = "_";
        }else{
            return this.char;
        }
        
    };
    
};




//send over the Letter Constructor function
module.exports = Letter;