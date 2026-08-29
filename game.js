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

  // Don't allow clicking if:
  // - game is finished
  // - cell already has something
  // - it's computer's turn

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

// ==============================
// COMPUTER MOVE — MINIMAX
// ==============================

function computerMove() {
  if (!running) return;

  let bestScore = -Infinity;
  let bestMove;

  // Try every empty position
  for (let i = 0; i < options.length; i++) {
    if (options[i] === "") {
      // Computer tries O here
      options[i] = computer;

      // Calculate the future score
      const score = minimax(options, 0, false);

      // Undo the move
      options[i] = "";

      // Save the best move
      if (score > bestScore) {
        bestScore = score;

        bestMove = i;
      }
    }
  }

  // Make the best move
  options[bestMove] = computer;

  cells[bestMove].textContent = computer;

  // Check winner
  checkWinner();
}

// ==============================
// MINIMAX ALGORITHM
// ==============================

function minimax(board, depth, isMaximizing) {
  const result = checkMinimaxWinner(board);

  // Computer wins
  if (result === computer) {
    return 10 - depth;
  }

  // Human wins
  if (result === human) {
    return depth - 10;
  }

  // Draw
  if (result === "draw") {
    return 0;
  }

  // COMPUTER'S TURN
  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = computer;

        const score = minimax(board, depth + 1, false);

        board[i] = "";

        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  }

  // HUMAN'S TURN
  else {
    let bestScore = Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = human;

        const score = minimax(board, depth + 1, true);

        board[i] = "";

        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
}

// ==============================
// CHECK WINNER FOR MINIMAX
// ==============================

function checkMinimaxWinner(board) {
  for (const condition of winConditions) {
    const [a, b, c] = condition;

    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // No empty cells = draw
  if (!board.includes("")) {
    return "draw";
  }

  // Game continues
  return null;
}

// ==============================
// CHECK REAL GAME WINNER
// ==============================

function checkWinner() {
  const result = checkMinimaxWinner(options);

  // Game is still running
  if (result === null) {
    changePlayer();

    return;
  }

  // Human wins
  if (result === human) {
    statusText.textContent = "🎉 You Win!";

    running = false;
  }

  // Computer wins
  else if (result === computer) {
    statusText.textContent = "🤖 Computer Wins!";

    running = false;
  }

  // Draw
  else if (result === "draw") {
    statusText.textContent = "🤝 It's a Draw!";

    running = false;
  }
}

// ==============================
// RESTART GAME
// ==============================

function restartGame() {
  currentPlayer = human;

  options = ["", "", "", "", "", "", "", "", ""];

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  statusText.textContent = "Your Turn (X)";

  running = true;
}
