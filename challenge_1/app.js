var strokes = { X: 1, O: 2 };

var board = [];

var preparePage = (boardSize, cellSize) => {
  var appNode = document.getElementById("app");
  appNode.appendChild(drawBoard(boardSize, cellSize));
  prepareBoard(boardSize);
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
      cell.style.height = cell.style.width = `${cellSize}px`;
      cell.onclick = e => handleCellClick(e);
    }
  }
  return boardNode;
};

var prepareBoard = boardSize => {
  board = [];
  for (var i = 0; i < boardSize; i++) {
    board.push([]);
    for (var j = 0; j < boardSize; j++) {
      board[i].push(0);
    }
  }
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  currentType = "X";
};
preparePage(3, 16);

var handleCellClick = e => {
  var cell = e.target;
  cell.innerHTML = currentType;
  setStroke(cell.getAttribute("row"), cell.getAttribute("col"));
};

var setStroke = (row, col) => {
  if (!board[row][col]) {
    board[row][col] = strokes[currentType];
    return checkWinner(row, col, currentType);
  }
};

var checkWinner = (row, col, type) => {
  var strokeVal = strokes[type];
  var rowWinner = rowSum(row) === board.length * strokeVal;
  var colWinner = colSum(col) === board.length * strokeVal;
  var diagonalWinner =
    majDiagonalSum() === board.length * strokeVal ||
    minDiagonalSum() === board.length * strokeVal;
  return rowWinner || colWinner || diagonalWinner;
};

var rowSum = row => board[row].reduce((sum, current) => sum + current, 0);

var colSum = col => board.reduce((sum, row) => sum + row[col], 0);

var majDiagonalSum = () => {
  var sum = 0;
  board.forEach((row, index) => (sum += row[index]));
  return sum;
};

var minDiagonalSum = () => {
  var sum = 0;
  board.forEach((row, index) => (sum += row[board.length - index - 1]));
  return sum;
};
