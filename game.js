const cells = document.querySelectorAll(".ttt-cell");
const statusText = document.querySelector("#status");
const resetBtn = document.querySelector("#resetBtn");

const human = "X";
const computer = "O";

let currentPlayer = human;
let running = true;

let options = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// ==============================
// INITIALIZE GAME
// ==============================

initializeGame();

function initializeGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked);
  });

  resetBtn.addEventListener("click", restartGame);

  statusText.textContent = "Your Turn (X)";

  running = true;
}

// ==============================
// HUMAN CLICK
// ==============================

function cellClicked() {
  const cellIndex = Number(this.dataset.index);

  if (options[cellIndex] !== "" || !running || currentPlayer !== human) {
    return;
  }

  // Human plays X
  updateCell(this, cellIndex);

  // Check winner
  checkWinner();

  // Computer plays after a short delay
  if (running && currentPlayer === computer) {
    statusText.textContent = "Computer is thinking... 🤖";

    setTimeout(computerMove, 500);
  }
}
// ==============================
// UPDATE CELL
// ==============================

function updateCell(cell, index) {
  options[index] = currentPlayer;

  cell.textContent = currentPlayer;
}

// ==============================
// CHANGE PLAYER
// ==============================

function changePlayer() {
  currentPlayer = currentPlayer === human ? computer : human;

  if (currentPlayer === human) {
    statusText.textContent = "Your Turn (X)";
  }
}
