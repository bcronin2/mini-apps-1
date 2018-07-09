window.controller = {
  players: {
    X: { name: "", wins: 0 },
    O: { name: "", wins: 0 }
  },

  init: function(boardSize = 3) {
    this.board = window.board;
    this.board.init(boardSize);
    this.inProgress = true;
    this.current = this.defender || "X";
    this.turns = 0;
    this.maxTurns = boardSize * boardSize;
  },

  handleCellClick: function(cell, callback) {
    if (this.inProgress && !cell.innerHTML) {
      var row = cell.getAttribute("row");
      var col = cell.getAttribute("col");
      cell.innerHTML = this.current;
      this.turns++;
      this.board.setCell(row, col, this.current);
      callback(this._getStatusMessage(row, col));
    }
  },

  _getStatusMessage: function(row, col) {
    this.inProgress = false;
    if (this.board.isWinner(row, col, this.current)) {
      this.defender = this.current;
      this.players[this.current].wins++;
      return `Player ${this.players[this.current].name} won!`;
    } else if (this.turns === this.maxTurns) {
      return "It's a tie!";
    } else {
      this.inProgress = true;
      this.current = this.current === "X" ? "O" : "X";
      return "";
    }
  }
};
