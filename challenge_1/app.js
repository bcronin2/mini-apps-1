var strokes = { X: 0, O: 1 };

var board = [];

var active;

var winner;

var preparePage = (boardSize, cellSize) => {
  var appNode = document.getElementById("app");
  appNode.appendChild(drawBoard(boardSize, cellSize));
  prepareGame(boardSize);
};

var drawBoard = (boardSize, cellSize) => {
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

var prepareGame = boardSize => {
  board = new2DArray(boardSize);
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  currentType = "X";
  active = true;
};

var handleCellClick = cell => {
  if (active && !cell.innerHTML) {
    cell.innerHTML = currentType;
    winningMove = setStroke(cell.getAttribute("row"), cell.getAttribute("col"));
    if (winningMove) {
      active = false;
      winner = currentType;
    } else {
      currentType = currentType === "X" ? "O" : "X";
    }
  }
};

var setStroke = (row, col) => {
  if (!board[row][col]) {
    board[row][col] = strokes[currentType];
    return checkWinner(row, col, currentType);
  }
};

var checkWinner = (row, col, type) => {
  var strokeVal = strokes[type];
  return (
    rowWinner(row, strokeVal) ||
    colWinner(col, strokeVal) ||
    majDiagonalWinner(strokeVal) ||
    minDiagonalWinner(strokeVal)
  );
};

var rowWinner = (row, strokeVal) =>
  board[row].reduce((isWinning, cell) => cell === strokeVal && isWinning, true);

var colWinner = (col, strokeVal) =>
  board.reduce((isWinning, row) => row[col] === strokeVal && isWinning, true);

var majDiagonalWinner = strokeVal => {
  isWinning = true;
  board.forEach(
    (row, index) => (isWinning = row[index] === strokeVal && isWinning)
  );
  return isWinning;
};

var minDiagonalWinner = strokeVal => {
  isWinning = true;
  board.forEach(
    (row, index) =>
      (isWinning = row[board.length - index - 1] === strokeVal && isWinning)
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

preparePage(3, 16);
