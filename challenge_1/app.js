const boardSize = 3;
const cellSize = 18;
const players = { X: "", O: "" };

var board;
var turnCounter;
var active;

var preparePage = () => {
  var appNode = document.getElementById("app");
  players["X"] = prompt("Enter name for player X.") || "X";
  players["O"] = prompt("Enter name for player O.") || "O";
  appNode.appendChild(drawBoard());
  appNode.appendChild(drawControls());
  prepareGame();
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
      cell.onclick = e => handleCellClick(e.target);
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
  newGameButton.onclick = prepareGame;

  controls.appendChild(currentPlayerIndicator);
  controls.appendChild(newGameButton);
  return controls;
};

var prepareGame = () => {
  board = new2DArray(boardSize);
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  currentType = "X";
  turnCounter = 0;
  active = true;
  setCurrentPlayer();
};

var setCurrentPlayer = () => {
  var currentPlayerIndicator = document.getElementById("current-player");
  currentPlayerIndicator.innerHTML = `It\'s player ${
    players[currentType]
  }'s turn!`;
};

var handleCellClick = cell => {
  if (active && !cell.innerHTML) {
    turnCounter++;

    var row = cell.getAttribute("row");
    var col = cell.getAttribute("col");

    cell.innerHTML = currentType;
    setStroke(row, col);

    if (checkWinner(row, col)) {
      active = false;
      processEnd(`Player ${players[currentType]} won!`);
    } else if (turnCounter === boardSize * boardSize) {
      active = false;
      processEnd("It's a tie!");
    } else {
      currentType = currentType === "X" ? "O" : "X";
      setCurrentPlayer();
    }
  }
};

var processEnd = message => {
  var newGame = confirm(`${message} Play again?`);
  if (newGame) {
    prepareGame();
  }
};

var setStroke = (row, col) => {
  board[row][col] = currentType;
};

var checkWinner = (row, col) => {
  return (
    rowWinner(row, currentType) ||
    colWinner(col, currentType) ||
    majDiagonalWinner(currentType) ||
    minDiagonalWinner(currentType)
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

preparePage();
