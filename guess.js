"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;

const player = {
  name: localStorage.getItem("playerName") || "Player",
  score: 20,
  highscore: 0,
};

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔️ No number!';
    displayMessage("⛔️ No number!");

    // When player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").textContent = secretNumber;

    // WIN
    document.querySelector("main").style.backgroundColor = "#de43b0";
    document.querySelector(".number").style.width = "20rem";

    if (player.score > player.highscore) {
      player.highscore = player.score;
      document.querySelector(".highscore").textContent = player.highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (player.score > 1) {
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      player.score--;
      document.querySelector(".score").textContent = player.score;
    } else {
      // document.querySelector('.message').textContent = '💥 You lost the game!';
      displayMessage("💥 You lost the game!");
      document.querySelector(".score").textContent = 0;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  player.score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = player.score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  document.querySelector("main").style.backgroundColor = "#E4E3D3";
  document.querySelector(".number").style.width = "15rem";
});

document.querySelector(".player-name").textContent =
  localStorage.getItem("playerName");
