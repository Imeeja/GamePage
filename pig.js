"use strict";
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceImg = document.querySelector(".dice");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
//appearance change
const playerSect0 = document.querySelector(".player--0");
const playerSect1 = document.querySelector(".player--1");
let summedScore, activePlayer, score, playing;

const init = function () {
  summedScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  diceImg.classList.add("hidden");

  current0.textContent = 0;
  current1.textContent = 0;
  playerSect0.classList.add("player--active");
  playerSect1.classList.remove("player--active");
  playerSect1.classList.remove("player--winner");
  playerSect0.classList.remove("player--winner");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  summedScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerSect0.classList.toggle("player--active");
  playerSect1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove("hidden");
    //   console.log(diceNum);
    diceImg.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      summedScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        summedScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    //add current score to the player score (score0, score1)
    score[activePlayer] += summedScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // check if score0/score1 >=100? if yes -> end game
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceImg.classList.add("hidden");

      playing = false;
    }
    // else -> switch player
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
document.querySelector(".player-name").textContent =
  localStorage.getItem("playerName");
