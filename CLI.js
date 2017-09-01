var ClozeCard = require('./ClozeCard.js');
var BasicCard = require('./BasicCard.js');

var inquirer = require('inquirer');
//var fs = require('fs');

function userInput() {
  inquirer.prompt([
    {
      name: "userChoice",
      message: "Would you like to create a new card or play with existing cards? Type n for new card and p for play."
    }
  ]).then(function (answers) {
    if (answers.userChoice === "n") {
      newCard();
    } else if (answers.userChoice === "p") {
      play();
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
    var clozeC = new ClozeCard(answers.text, answers.cloze);
    clozeCards.push(clozeC);
    console.log("Your flashcard has been added to the deck.");
    if (answers.choice === "c") {
      basicCard();
    } else if (answers.choice = "p") {
      play();
    }
  });
}

basicCount = 0;

function playBasic() {
  console.log("You will have 30 seconds for each card. Ready?");
  var randomIndex = Math.floor(Math.random() * basicCards.length);
  console.log(randomIndex);
  setTimeout(function() {
    console.log(basicCards[randomIndex].front);
  }, 2000);
  setTimeout(function() {
    console.log(basicCards[randomIndex].back);
  }, 3000);
  setTimeout(function() {
    basicCards.splice(randomIndex, 1);
    basicCount++;
    console.log("basiccount: " + basicCount);
    console.log("basicCards.length: " + basicCards.length);
    if (basicCount <= basicCards.length) {
      playBasic();
    }
  }, 4000);
}

//var firstPresident = new BasicCard("Who was", "GW");
//var firstPrezCloze = new ClozeCard("GW was first prez", "fun");
//
//var userChoice = process.argv[2];
//
//if (userChoice === "basic") {
//  console.log(firstPresident.front);
//} else if (userChoice === "basic-answer") {
//  console.log(firstPresident.back);
//}
//
//if (userChoice === "cloze") {
//  if (!firstPrezCloze.text.includes(firstPrezCloze.cloze)) {
//    console.log("error");
//  } else {
//    console.log(firstPrezCloze.partial);
//  } 
//} else if (userChoice === "cloze-answer") {
//  console.log(firstPrezCloze.text);
//}

userInput();
