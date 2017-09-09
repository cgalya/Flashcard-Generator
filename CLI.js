var ClozeCard = require('./ClozeCard.js');
var BasicCard = require('./BasicCard.js');
var inquirer = require('inquirer');
var clozeCards = [];
var basicCards = [];


function userInput() {
  inquirer.prompt([
    {
      name: "userChoice",
      message: "Welcome to the flashcard generator! Press s to get started!"
    }
  ]).then(function (answers) {
    if (answers.userChoice === "s") {
      newCard();
    }
  });
}


function newCard() {
  inquirer.prompt([
    {
      name: "cardChoice",
      message: "Would you like to create basic cards or cloze deleted cards? Type b for basic or c for cloze."
    }
  ]).then(function (answers) {
    if (answers.cardChoice === "b") {
      basicCard();
    } else if (answers.cardChoice === "c") {
      clozeCard();
    }
  });
}


function basicCard() {
  inquirer.prompt([
    {
      name: "front",
      message: "What would you like the front of your card to say?"
    },
    {
      name: "back",
      message: "What would you like the back of your card to say?"
    },
    {
      name: "choice",
      message: "Your flashcard has been added to the deck. Would you like to make another card or play? Type c for new card or p for play."
    }
  ]).then(function (answers) {
    var basicC = new BasicCard(answers.front, answers.back);
    basicCards.push(basicC);
    if (answers.choice === "c") {
      basicCard();
    } else if (answers.choice = "p") {
      console.log("You will have 5 seconds for each card. Ready?");
      playBasic();
    }
  });
}




function clozeCard() {
  inquirer.prompt([
    {
      name: "text",
      message: "What would you like the full text of your card to say?"
    },
    {
      name: "cloze",
      message: "What would you like the cloze deletion of your card to be?"
    }
  ]).then(function (answers) {
    var lowerText = answers.text.toLowerCase();
    var lowerCloze = answers.cloze.toLowerCase();
    if (!lowerText.includes(lowerCloze)) {
      inquirer.prompt([
        {
          name: "error",
          message: "Oops! Your cloze deletion isn't part of your full text.  Let's try again.  Type c to continue."
        }
      ]).then(function (answers) {
        clozeCard();
      })
    } else {
      inquirer.prompt([
        {
          name: "choice",
          message: "Your flashcard has been added to the deck. Would you like to make another card or play? Type c for card or p for play."
        }
      ]).then(function (answer) {
        var clozeC = new ClozeCard(answers.text, answers.cloze);
        clozeCards.push(clozeC);
        if (answer.choice === "c") {
          clozeCard();
        } else if (answer.choice === "p") {
          console.log("You will have 5 seconds for each card. Ready?");
          playCloze();
        }
      })
    }
  });
}



function playBasic() {
  var randomIndex = Math.floor(Math.random() * basicCards.length);
  setTimeout(function () {
    console.log("\n" + basicCards[randomIndex].front);
  }, 2000);
  setTimeout(function () {
    console.log(basicCards[randomIndex].back);
  }, 5000);
  setTimeout(function () {
    basicCards.splice(randomIndex, 1);
    if (basicCards.length > 0) {
      playBasic();
    }
  }, 5100);
}




function playCloze() {
  var randomIndex = Math.floor(Math.random() * clozeCards.length);
  setTimeout(function () {
    console.log("\n" + clozeCards[randomIndex].partial);
  }, 2000);
  setTimeout(function () {
    console.log(clozeCards[randomIndex].text);
  }, 5000);
  setTimeout(function () {
    clozeCards.splice(randomIndex, 1);
    if (clozeCards.length > 0) {
      playCloze();
    }
  }, 5100);
}


userInput();
