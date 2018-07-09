const boardSize = 3;
const cellSize = 18;
const players = { X: "", O: "" };

var board;
var currentPlayer;
var turnCounter;
var active;

// BOARD VIEW

var initializePage = () => {
  var appNode = document.getElementById("app");
  players["X"] = prompt("Enter name for player X.") || "X";
  players["O"] = prompt("Enter name for player O.") || "O";
  appNode.appendChild(drawBoard());
  appNode.appendChild(drawControls());
  refreshPage();
};

var drawBoard = () => {
  var boardNode = document.createElement("table");
  boardNode.setAttribute("id", "board");
  for (var i = 0; i < boardSize; i++) {
    var row = boardNode.insertRow();
    for (var j = 0; j < boardSize; j++) {
      var cell = row.insertCell();
      cell.setAttribute("class", "cell");
      cell.setAttribute("row", i);
      cell.setAttribute("col", j);
      cell.style.border = "1px solid";
      cell.style.cursor = "pointer";
      cell.style.height = cell.style.width = `${cellSize}px`;
      cell.addEventListener("click", e => handleCellClick(e.target));
    }
  }
  return boardNode;
};

var drawControls = () => {
  var controls = document.createElement("div");
  var currentPlayerIndicator = document.createElement("div");
  var newGameButton = document.createElement("button");

  currentPlayerIndicator.setAttribute("id", "current-player");
  newGameButton.innerHTML = "New game";
  newGameButton.addEventListener("click", prepareGame);

  controls.appendChild(currentPlayerIndicator);
  controls.appendChild(newGameButton);
  return controls;
};

var clearBoard = () => {
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
};

var showCurrentPlayer = () => {
  var currentPlayerIndicator = document.getElementById("current-player");
  currentPlayerIndicator.innerHTML = `It\'s ${players[currentPlayer]}'s turn!`;
};

var refreshPage = () => {
  prepareGame();
  clearBoard();
  showCurrentPlayer();
};

var handleCellClick = cell => {
  if (active && !cell.innerHTML) {
    turnCounter++;

    var row = cell.getAttribute("row");
    var col = cell.getAttribute("col");

    cell.innerHTML = currentPlayer;
    setCell(row, col);

    if (checkWinner(row, col)) {
      active = false;
      handleGameEnd(`Player ${players[currentPlayer]} won!`);
    } else if (turnCounter === boardSize * boardSize) {
      active = false;
      handleGameEnd("It's a tie!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      showCurrentPlayer();
    }
  }
};

var handleGameEnd = message => {
  var newGame = confirm(`${message} Play again?`);
  if (newGame) {
    refreshPage();
  }
};

// BOARD LOGIC

var prepareGame = () => {
  board = new2DArray(boardSize);
  currentPlayer = "X";
  turnCounter = 0;
  active = true;
};

var setCell = (row, col) => {
  board[row][col] = currentPlayer;
};

var checkWinner = (row, col) => {
  return (
    rowWinner(row, currentPlayer) ||
    colWinner(col, currentPlayer) ||
    majDiagonalWinner(currentPlayer) ||
    minDiagonalWinner(currentPlayer)
  );
};

var rowWinner = (row, type) =>
  board[row].reduce((isWinning, cell) => cell === type && isWinning, true);

var colWinner = (col, type) =>
  board.reduce((isWinning, row) => row[col] === type && isWinning, true);

var majDiagonalWinner = type => {
  isWinning = true;
  board.forEach((row, index) => (isWinning = row[index] === type && isWinning));
  return isWinning;
};

var minDiagonalWinner = type => {
  isWinning = true;
  board.forEach(
    (row, index) =>
      (isWinning = row[board.length - index - 1] === type && isWinning)
  );
  return isWinning;
};

var new2DArray = size => {
  var arr = [];
  for (var i = 0; i < size; i++) {
    arr.push([]);
    for (var j = 0; j < size; j++) {
      arr[i].push(null);
    }
  }
  return arr;
};

initializePage();
