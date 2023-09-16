let scoreX = 0;
let scoreO = 0;

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
  displayScore();
};

const endGame = (isDraw) => {
    if (isDraw) {
      winningMessageTextElement.innerText = "It's a draw!";
    } else {
      winningMessageTextElement.innerText = isCircleTurn ? "O Won!" : "X Won!";
      // Se um jogador vencer, atualize o placar
      updateScore();
      displayScore();
    }
  
    winningMessage.classList.add("show-winning-message");
  };


  const updateScore = () => {
    if (isCircleTurn) {
      scoreO++;
    } else {
      scoreX++;
    }
  };
  
  const displayScore = () => {
    const scoreXElement = document.querySelector("[data-score-x]");
    const scoreOElement = document.querySelector("[data-score-o]");
  
    scoreXElement.innerText = `X: ${scoreX}`;
    scoreOElement.innerText = `O: ${scoreO}`;
  };
  
const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Place the mark (X or circle)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Check for a win
  const isWin = checkForWin(classToAdd);

  // Check for a draw
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Change symbol
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);