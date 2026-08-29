"use strict";
let errors = 0;
let cardList = [
  "batman",
  "captain",
  "flash",
  "green",
  "ironman",
  "robin",
  "spiderman",
  "superman",
  "the",
  "wonder",
];
let cardSet;
let board = [];
let rows = 4;
let cols = 5;
let card1Selected;
let card2Selected;

let matchedCards = 0;

window.onload = function () {
  shuffleCards();
  startGame();
};

function shuffleCards() {
  cardSet = cardList.concat(cardList); // two of each card
  console.log(cardSet);

  // Shuffle
  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length); // get random index

    // Swap
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }

  console.log(cardSet);
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg); //js

      let cardElement = document.createElement("img");
      cardElement.id = r.toString() + "-" + c.toString();
      cardElement.src = `assets/${cardImg}.png`;
      cardElement.classList.add("card");
      cardElement.addEventListener("click", selectCard);
      document.getElementById("board").append(cardElement);
    }
    board.push(row);
    setTimeout(hideCards, 1000);
  }
  console.log(board);
}
function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      document.getElementById(r.toString() + "-" + c.toString()).src =
        "assets/back.png";
    }
  }
}

function selectCard() {
  if (this.src.includes("back")) {
    if (!card1Selected) {
      card1Selected = this;

      let coords = card1Selected.id.split("-");
      let r = Number(coords[0]);
      let c = Number(coords[1]);

      card1Selected.src = "assets/" + board[r][c] + ".png";
    } else if (!card2Selected && card1Selected !== this) {
      card2Selected = this;

      let coords = card2Selected.id.split("-");
      let r = Number(coords[0]);
      let c = Number(coords[1]);

      card2Selected.src = "assets/" + board[r][c] + ".png";
      setTimeout(update, 1000);
    }
  }
}
function update() {
  if (card1Selected.src !== card2Selected.src) {
    card1Selected.src = "assets/back.png";
    card2Selected.src = "assets/back.png";

    errors += 1;
    document.querySelector("#errors").innerText = errors;
  } else {
    matchedCards += 2;

    if (matchedCards === rows * cols) {
      document.querySelector("#winMessage").innerText = "🎉 YOU WIN!";
      document.querySelector("#againBtn").classList.remove("hidden");
    }
  }

  card1Selected = null;
  card2Selected = null;
}
