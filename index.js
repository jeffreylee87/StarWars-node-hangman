var Word = require("./word");
var request = require("request");
var inquirer = require("inquirer");
var starwarMe = require('starwars-me')

var start = function () {
    var guessLeft = 10;
    var regex = /^[a-zA-Z\s]*$/;
    var randomNumber = Math.floor(Math.random() * 87) + 1;
    request("https://swapi.co/api/people/" + randomNumber + "/", function (error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            console.log(`\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n`);
            console.log(starwarMe());
            console.log("Welcome to Star Wars Word Guess!");
            console.log(`\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n`);

        }
        //gets word and sets it to lower case   
        var picked = JSON.parse(body).name.toLowerCase();

        // console.log(picked); UNCOMMENT IF YOU WANT TO SEE THE WORD BEFORE PLAYING

        //tests whether the word has only letters and spaces, if not select again
        if (regex.test(picked)) {

        } else {
            start();
        }

        var player = new Word(picked);
        player.converter();

        console.log(`\n`);
        console.log(player.actual.join(" "));
        console.log('\n');

        //picks a letter using inquirer
        function ask() {

            inquirer.prompt([{
                name: "choice",
                message: "Pick a Letter!!!!!",
                validate: function (value) {
                    if (/^[A-Z]$/i.test(value)) {
                        return true;
                    }
                    return false;
                }
            }]).then(function (ans) {
                //does all the checking for us
                player.guesser(ans.choice);
                //if incorrect
                if (player.array.indexOf(ans.choice) === -1) {
                    guessLeft--
                    console.log("\ncxxxxxx][🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴\n");
                    console.log("The force is not with you, pick again!")
                    console.log(`\n${player.actual.join(" ")}\n`);
                    console.log(`You have ${guessLeft} guesses left, young padawan.`);
                    console.log("\nס₪₪₪₪₪₪§|(🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴\n");
                    if (guessLeft > 0) {
                        ask();
                    } else {
                        console.log(`\n❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗\n`);
                        console.log(starwarMe());
                        console.log("DARTH VADER KILLED YOU. GAME OVER!!!!");
                        console.log(`\n❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗\n`);
                        process.exit();
                        
                    }

                } else {
                    //if guessed correct 
                    console.log("\ncxxxxx][🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵\n");
                    console.log("The force is strong with this one");
                    console.log(`\n${player.actual.join(" ")}\n`);
                    console.log("\ncxxxxx][🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵\n");
                    if (JSON.stringify(player.array) !== JSON.stringify(player.actual)) {
                        ask();
                    } else {
                        console.log(`\n🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉\n`);
                        console.log(starwarMe());
                        console.log("Midichlorian Count is off the charts! You Won!!!!!!");
                        console.log(player.array.join(" "));
                        console.log(`\n🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉\n`);
                        process.exit();
                    }

                }

            });
        }
        //ask initial question to start game
        ask();
        //function to continue playing
        // function keepPlaying() {
        //     inquirer.prompt([{
        //         type: "list",
        //         name: "ask",
        //         message: "Would you like to continue your Jedi training?",
        //         choices: ["Yes", "No"]
        //     }]).then(function (ans) {
        //         if (ans.ask === "Yes") {
        //             start();
        //         } else {
        //             process.exit();
        //         }
        //     });
        // }

    });
};
//starts the game when you load the js file
start();