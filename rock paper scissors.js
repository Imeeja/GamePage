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



let playerPoints = 0;
let computerPoints = 0;
let currentRound = 1;

let choices = ["rock", "paper", "scissors"];