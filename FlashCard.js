var inquirer = require("inquirer"); //importing the inquirer npm module.

//Instantiating the questions array, the question counter as well as correct and wrong answers counters.
var questions = [];
var clozeQuestions = [];
var questionsCounter = 0;
var rightAnswers = 0;
var wrongAnswers = 0;


//Constructor for creating the basicCard function.
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

var q1 = new BasicCard("Who was the first President of the USA", "George Washington");
var q2 = new BasicCard("Who was the only President to serve more than two terms?", "Franklin D. Roosevelt");
var q3 = new BasicCard("Who was the oldest elected President?", "Donald J. Trump");
var q4 = new BasicCard("Who was the only President to serve two non-consecutive terms?", "Grover Cleveland");

//pushing the questions into the questions array.
questions.push(q1);
questions.push(q2);
questions.push(q3);
questions.push(q4);


var askQuestion = function() {

if ( questionsCounter < questions.length) {

    inquirer.prompt([
      {
        type: "input",
        name: "userGuess",
        message: questions[questionsCounter].front
      }
    ]).then(function(answers) {
      if (answers.userGuess === questions[questionsCounter].back) {
        console.log("Correct!\n ");
        rightAnswers++;
      } else {
        console.log(" \n That's not the correct answer!");
        console.log(" The correct answer is " + questions[questionsCounter].back);
        wrongAnswers++;
      }
      
      questionsCounter++;
      askQuestion();
    });
  } else {
      questionsCounter = 0;
      console.log("\n ================End of Game=============");
      console.log(" \n You have answered " + rightAnswers + " questions correctly.");
      console.log(" And, you have got " + wrongAnswers+ " questions wrong. \n ");
      inquirer.prompt([
            {
              type: "confirm",
              name: "replayGame",
              message: "Do you want to play again?\n "
            }
            ]).then(function (answers) {
              if(answers.replayGame === true) {
                gameStarter();
             
              } else {
              console.log("Thank you!");
              console.log("Bye!Bye!");
              }

        });
      }
}

 function ClozeCard(fullText, cloze) {
    this.fullText = fullText;
    this.cloze = cloze;
    this.partial = fullText.replace(cloze, '...');
    }

//Creating the clozeCard objects
var c1 = new ClozeCard("George Washington was the first President of the USA.", "George Washington");
var c2 = new ClozeCard("Franklin D. Roosevelt was the only President to serve more than two terms.", "Franklin D. Roosevelt");
var c3 = new ClozeCard("Donald J. Trump is the oldest elected President.", "Donald J. Trump");
var c4 = new ClozeCard("Grover Cleveland was the only President to serve two non-consecutive terms?", "Grover Cleveland");

//Pushing the clozeCard objects into the clozedQeustions array
clozeQuestions.push(c1);
clozeQuestions.push(c2);
clozeQuestions.push(c3);
clozeQuestions.push(c4);


var askCloze = function() {
  if (questionsCounter < clozeQuestions.length) {

      inquirer.prompt([
        {
          type: "input",
          name: "userGuess",
          message: clozeQuestions[questionsCounter].partial,
        }
      ]).then(function(answers) {
        if (answers.userGuess === clozeQuestions[questionsCounter].cloze) {
          console.log("Correct \n ");
          rightAnswers++;
        } else {
          console.log("\n Wrong!");
          console.log("The correct answer is: " + clozeQuestions[questionsCounter].fullText);
          wrongAnswers++;
        }
      
      questionsCounter++;
      askCloze();
      });
    } else {
       questionsCounter = 0;
        console.log("\n ================End of Game=============");
        console.log(" \n You have answered " + rightAnswers + " questions correctly.");
        console.log(" And, you have got " + wrongAnswers+ " questions wrong. \n ");
       inquirer.prompt([
            {
              type: "confirm",
              name: "replayGame",
              message: "Do you want to play again?"
            }
            ]).then(function (answers) {
            if(answers.replayGame === true) {
                gameStarter();
              } else {
                console.log("Thank you!");
                console.log("Bye!Bye!");
            }

          });
        }
  }


var gameStarter = function () {
  inquirer.prompt([
  {
    type: "list",
    name: "starter",
    message: "Which flash cards do you want?",
    choices: ["Basic flash card", "Cloze flash card"]

  }
    ]).then(function (answers) {
    if (answers.starter === "Basic flash card") {
      askQuestion();
    }
    else {
      askCloze();
    }
});
}

gameStarter();