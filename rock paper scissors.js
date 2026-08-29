// Get elements from HTML
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");

let playerChoice = document.getElementById("player-choice");
let computerChoice = document.getElementById("computer-choice");

let playerChoiceName = document.getElementById("player-choice-name");
let computerChoiceName = document.getElementById("computer-choice-name");

let playerScore = document.getElementById("player-score");
let computerScore = document.getElementById("computer-score");

let result = document.getElementById("result");
let round = document.getElementById("round");

let reset = document.getElementById("reset");


// Game variables
let playerPoints = 0;
let computerPoints = 0;
let currentRound = 1;

let choices = ["rock", "paper", "scissors"];


// Computer choices
function computerChoose() {

    let randomNumber = Math.floor(Math.random() * choices.length);

    return choices[randomNumber];
}

// Function to show emoji
function getEmoji(choice) {

    if (choice === "rock") {
        return "✊";
    }

    if (choice === "paper") {
        return "📄";
    }

    if (choice === "scissors") {
        return "✂️";
    }
}


// Function to decide winner
function playGame(player) {

    // Check if game is finished
    if (currentRound > 5) {
        return;
    }

    let computer = computerChoose();

    // Show choices
    playerChoice.innerText = getEmoji(player);
    computerChoice.innerText = getEmoji(computer);

    playerChoiceName.innerText = player.toUpperCase();
    computerChoiceName.innerText = computer.toUpperCase();


    // Check winner

    if (player === computer) {

        result.innerText = "It's a Draw! 🤝";

    }

    else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {

        playerPoints++;

        playerScore.innerText = playerPoints;

        result.innerText = "You Win! 🎉";

    }

    else {

        computerPoints++;

        computerScore.innerText = computerPoints;

        result.innerText = "Computer Wins! 🤖";

    }


    // Move to next round
    currentRound++;

    if (currentRound <= 5) {

        round.innerText = currentRound;

    }

    else {

        // Game finished
        if (playerPoints > computerPoints) {

            result.innerText = "🏆 You Won the Game!";

        }

        else if (computerPoints > playerPoints) {

            result.innerText = "🤖 Computer Won the Game!";

        }

        else {

            result.innerText = "🤝 Game Draw!";

        }

    }
}



// Button events

rock.addEventListener("click", function () {

    playGame("rock");

});


paper.addEventListener("click", function () {

    playGame("paper");

});


scissors.addEventListener("click", function () {

    playGame("scissors");

});
