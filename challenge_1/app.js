const cellSize = 18;

class App {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.initializeGame();
    this.drawBoard();
    this.refreshPage();
    document
      .getElementById("newGameButton")
      .addEventListener("click", this.refreshPage.bind(this));
  }

  initializeGame() {
    var playerX = prompt("Enter name for player X.") || "X";
    var playerO = prompt("Enter name for player O.") || "O";
    this.controller = new Controller(this.boardSize, {
      X: playerX,
      O: playerO
    });
  }

  drawBoard() {
    var boardNode = document.getElementById("board");
    for (var i = 0; i < this.boardSize; i++) {
      var rowNode = document.createElement("div");
      rowNode.setAttribute("class", "row");
      boardNode.appendChild(rowNode);
      for (var j = 0; j < this.boardSize; j++) {
        rowNode.appendChild(this.drawCell(i, j));
      }
    }
  }

  drawCell(row, col) {
    var cellNode = document.createElement("span");
    cellNode.setAttribute("class", "cell");
    cellNode.setAttribute("id", `${row}-${col}`);
    cellNode.addEventListener("click", () =>
      this.handleCellClick(cellNode, row, col)
    );
    return cellNode;
  }

  handleCellClick(cellNode, row, col) {
    this.controller.fillCell(row, col, (value, message) => {
      cellNode.innerHTML = value;
      this.setNewGameButtonVisibility("block");
      this.showCurrentPlayer();
      if (message) {
        this.endGame(message);
      } else {
        this.rotateBoard(this.setCells.bind(this));
      }
    });
  }

  setCells() {
    for (var i = 0; i < this.boardSize; i++) {
      for (var j = 0; j < this.boardSize; j++) {
        document.getElementById(
          `${i}-${j}`
        ).innerHTML = this.controller.game.board[i][j];
      }
    }
  }

  rotateBoard(callback) {
    var boardNode = document.getElementById("board");
    var boardNodeClone = boardNode.cloneNode(true);
    boardNode.style.display = "none";

    document.getElementById("app").appendChild(boardNodeClone);
    boardNodeClone.setAttribute("id", "boardClone");
    // boardNodeClone.style.webkitTransform = "rotate(-90deg)";
    // boardNodeClone.style.mozTransform = "rotate(-90deg)";
    // boardNodeClone.style.msTransform = "rotate(-90deg)";
    // boardNodeClone.style.oTransform = "rotate(-90deg)";
    boardNodeClone.style.transform = "rotate(-90deg)";

    setTimeout(() => {
      callback();
      boardNodeClone.parentNode.removeChild(boardNodeClone);
      boardNode.style.display = "block";
    }, 500);
  }

  setNewGameButtonVisibility(visibility) {
    document.getElementById("newGameButton").style.display = visibility;
  }

  refreshPage() {
    if (this.controller.game.turns > 0) {
      this.controller.resetGame(this.boardSize);
    }
    this.clearBoard();
    this.showCurrentPlayer();
    this.showRecords();
    this.setNewGameButtonVisibility("none");
  }

  showCurrentPlayer() {
    var currentPlayerNode = document.getElementById("currentPlayer");
    currentPlayerNode.innerHTML = this.controller.players[
      this.controller.game.current
    ].name;
  }

  showRecords() {
    document.getElementById(
      "playerXName"
    ).innerHTML = this.controller.players.X.name;
    document.getElementById(
      "playerXWins"
    ).innerHTML = this.controller.players.X.wins;
    document.getElementById(
      "playerOName"
    ).innerHTML = this.controller.players.O.name;
    document.getElementById(
      "playerOWins"
    ).innerHTML = this.controller.players.O.wins;
  }

  endGame(message) {
    var newGame = confirm(`${message} Play again?`);
    if (newGame) {
      this.refreshPage();
    }
  }

  clearBoard() {
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
    }
  }
}

new App(3);
