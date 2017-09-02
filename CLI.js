var ClozeCard = require('./ClozeCard.js');
var BasicCard = require('./BasicCard.js');
var inquirer = require('inquirer');
var basicCount = 0;
var clozeCount = 0;

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
      message: "Would you like to create basic cards or cloze deleted cards? Type b for basic and c for cloze."
    }
  ]).then(function (answers) {
    if (answers.cardChoice === "b") {
      basicCard();
    } else if (answers.cardChoice === "c") {
      clozeCard();
    }
  });
}


var basicCards = [];

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
      message: "Would you like to make another card or play? Type c for card and p for play."
    }
  ]).then(function (answers) {
    var basicC = new BasicCard(answers.front, answers.back);
    basicCards.push(basicC);
    console.log("Your flashcard has been added to the deck.");
    if (answers.choice === "c") {
      basicCard();
    } else if (answers.choice = "p") {
      playBasic();
    }
  });
}


var clozeCards = [];

function clozeCard() {
  inquirer.prompt([
    {
      name: "text",
      message: "What would you like the full text of your card to say?"
    },
    {
      name: "cloze",
      message: "What would you like the cloze deletion of your card to be?"
    },
    {
      name: "choice",
      message: "Would you like to make another card or play? Type c for card and p for play."
    }
  ]).then(function (answers) {
    if (!answers.text.includes(answers.cloze)) {
      console.log("Oops! Your cloze isn't found in your text.  Let's try again...");
      clozeCard();
    } else {
      var clozeC = new ClozeCard(answers.text, answers.cloze);
      clozeCards.push(clozeC);
      console.log(clozeCards);
      console.log("Your flashcard has been added to the deck.");
      if (answers.choice === "c") {
        basicCard();
      } else if (answers.choice = "p") {
        playCloze();
      }
    }

  });
}



function playBasic() {
  console.log("You will have 30 seconds for each card. Ready?");
  var randomIndex = Math.floor(Math.random() * basicCards.length);
  console.log(randomIndex);
  setTimeout(function () {
    console.log(basicCards[randomIndex].front);
  }, 2000);
  setTimeout(function () {
    console.log(basicCards[randomIndex].back);
  }, 3000);
  setTimeout(function () {
    basicCards.splice(randomIndex, 1);
    basicCount++;
    console.log("basiccount: " + basicCount);
    console.log("basicCards.length: " + basicCards.length);
    if (basicCount <= basicCards.length) {
      playBasic();
    }
  }, 4000);
}




function playCloze() {
  console.log("You will have 30 seconds for each card. Ready?");
  var randomIndex = Math.floor(Math.random() * basicCards.length);
  console.log(randomIndex);
  setTimeout(function () {

    console.log(clozeCards[randomIndex].partial);
  }, 2000);
  setTimeout(function () {
    console.log(clozeCards[randomIndex].cloze);
  }, 3000);
  setTimeout(function () {
    clozeCards.splice(randomIndex, 1);
    clozeCount++;
    console.log("clozecount: " + clozeCount);
    console.log("clozeCards.length: " + clozeCards.length);
    if (clozeCount <= clozeCards.length) {
      playCloze();
    }
  }, 4000);
}


userInput();
