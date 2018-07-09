const cellSize = 18;

const gameView = {
  boardSize: 3,

  init: function(boardSize) {
    this.controller = window.controller;
    this.boardSize = boardSize;
    var appNode = document.getElementById("app");
    appNode.appendChild(this.drawBoard());
    appNode.appendChild(this.drawControls());

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
    var boardNode = document.createElement("table");
    boardNode.setAttribute("id", "board");
    for (var i = 0; i < this.boardSize; i++) {
      var row = boardNode.insertRow();
      for (var j = 0; j < this.boardSize; j++) {
        var cell = row.insertCell();
        cell.setAttribute("class", "cell");
        cell.setAttribute("row", i);
        cell.setAttribute("col", j);
        cell.style.border = "1px solid";
        cell.style.cursor = "pointer";
        cell.style.height = cell.style.width = `${cellSize}px`;
        cell.addEventListener("click", e => {
          this.controller.handleCellClick(e.target, message => {
            this.showCurrentPlayer();
            if (message) {
              this.handleGameEnd(message);
            }
          });
        });
      }
    }
    return boardNode;
  },

  drawControls: function() {
    var controls = document.createElement("div");
    var currentPlayerIndicator = document.createElement("div");
    var records = document.createElement("div");
    var newGameButton = document.createElement("button");

    currentPlayerIndicator.setAttribute("id", "current-player");
    records.setAttribute("id", "player-records");
    newGameButton.innerHTML = "New game";
    newGameButton.addEventListener("click", this.refreshPage.bind(this));

    controls.appendChild(currentPlayerIndicator);
    controls.appendChild(records);
    controls.appendChild(newGameButton);
    return controls;
  },

  showRecords: function() {
    var recordsNode = document.getElementById("player-records");
    recordsNode.innerHTML = `${this.controller.players.X.name} (X): ${
      this.controller.players.X.wins
    } wins <br />
      ${this.controller.players.O.name} (O): ${
      this.controller.players.O.wins
    } wins`;
  },

  showCurrentPlayer: function() {
    var currentPlayerNode = document.getElementById("current-player");
    currentPlayerNode.innerHTML = `It\'s ${
      this.controller.players[this.controller.current].name
    }'s turn!`;
  },

  refreshPage: function() {
    this.controller.init(this.boardSize);
    this.clearBoard();
    this.showCurrentPlayer();
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
