const cellSize = 18;

const gameView = {
  boardSize: 3,

  init: function(boardSize) {
    this.controller = window.controller;
    this.boardSize = boardSize;
    var appNode = document.getElementById("app");
    appNode.appendChild(this.drawBoard());

    document
      .getElementById("newGameButton")
      .addEventListener("click", this.refreshPage.bind(this));

    this.setPlayers();
    this.refreshPage();
  },

  setPlayers: function() {
    playerX = prompt("Enter name for player X.") || "X";
    playerO = prompt("Enter name for player O.") || "O";
    this.controller.players.X.name = playerX;
    this.controller.players.O.name = playerO;
  },

  drawBoard: function() {
    var boardNode = document.getElementById("board");
    for (var i = 0; i < this.boardSize; i++) {
      var rowNode = document.createElement("div");
      rowNode.setAttribute("class", "row");
      rowNode.setAttribute("class", "row");
      for (var j = 0; j < this.boardSize; j++) {
        rowNode.appendChild(this.drawCell(i, j));
      }
      boardNode.appendChild(rowNode);
    }
    return boardNode;
  },

  drawCell: function(i, j) {
    var cellNode = document.createElement("span");
    cellNode.setAttribute("class", "cell");
    cellNode.setAttribute("row", i);
    cellNode.setAttribute("col", j);
    cellNode.addEventListener("click", () => {
      this.controller.handleCellClick(i, j, (value, message) => {
        document.getElementById("newGameButton").style.display = "block";
        cellNode.innerHTML = value;
        this.showCurrentPlayer();
        if (message) {
          this.handleGameEnd(message);
        }
      });
    });
    return cellNode;
  },

  showRecords: function() {
    var recordsNode = document.getElementById("records");
    recordsNode.innerHTML = `${this.controller.players.X.name} (X): ${
      this.controller.players.X.wins
    } wins <br />
      ${this.controller.players.O.name} (O): ${
      this.controller.players.O.wins
    } wins`;
  },

  showCurrentPlayer: function() {
    var currentPlayerNode = document.getElementById("status");
    currentPlayerNode.innerHTML = `It\'s ${
      this.controller.players[this.controller.current].name
    }'s turn!`;
  },

  refreshPage: function() {
    this.controller.init(this.boardSize);
    this.clearBoard();
    this.showCurrentPlayer();
    this.showRecords();
    document.getElementById("newGameButton").style.display = "none";
  },

  clearBoard: function() {
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
    }
  },

  handleGameEnd: function(message) {
    var newGame = confirm(`${message} Play again?`);
    if (newGame) {
      this.refreshPage();
    }
  }
};

gameView.init(3);
