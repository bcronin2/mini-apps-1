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
    cellNode.setAttribute("row", row);
    cellNode.setAttribute("col", col);
    cellNode.addEventListener("click", () => {
      this.controller.handleCellClick(row, col, (value, message) => {
        cellNode.innerHTML = value;
        this.setNewGameButtonVisibility("block");
        this.showCurrentPlayer();
        if (message) {
          this.endGame(message);
        }
      });
    });
    return cellNode;
  }

  setNewGameButtonVisibility(visibility) {
    document.getElementById("newGameButton").style.display = visibility;
  }

  showRecords() {
    var recordsNode = document.getElementById("records");
    recordsNode.innerHTML = `${this.controller.players.X.name} (X): ${
      this.controller.players.X.wins
    } wins <br />
      ${this.controller.players.O.name} (O): ${
      this.controller.players.O.wins
    } wins`;
  }

  showCurrentPlayer() {
    var currentPlayerNode = document.getElementById("status");
    currentPlayerNode.innerHTML = `It\'s ${this.getCurrentPlayer()}'s turn!`;
  }

  getCurrentPlayer() {
    return this.controller.players[this.controller.game.current].name;
  }

  endGame(message) {
    var newGame = confirm(`${message} Play again?`);
    if (newGame) {
      this.refreshPage();
    }
  }

  refreshPage() {
    this.controller.resetGame(this.boardSize);
    this.clearBoard();
    this.showCurrentPlayer();
    this.showRecords();
    this.setNewGameButtonVisibility("none");
  }

  clearBoard() {
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
    }
  }
}

new App(3);
