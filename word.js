     var Letter = require("./letter");

     var Word = function (pickedWord) {
         this.array = pickedWord.split("");
         this.check = false;
         this.actual = [];
        //converts the function into _____ word
         this.converter = function () {
             for (var i in this.array) {
                 var newArray = new Letter(this.array[i]);
                 newArray.convert();
                 this.actual.push(newArray.char);
             } 
            return this.actual;
             //might use join to concat
            //  console.log(this.actual.join(""));
         }

         this.guesser = function (letGuessed) {
        
            for (var i in this.array){
            if(letGuessed === this.array[i]){
            var check = new Letter(letGuessed);
            check.guessed = true;
            check.convert();
            this.actual.splice(i, 1, letGuessed);
            }
            }
            // console.log(this.actual);
            return this.actual;
        }
         }
     

     module.exports = Word;