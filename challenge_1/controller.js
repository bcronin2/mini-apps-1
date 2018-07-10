class Controller {
  constructor(boardSize, players) {
    this.game = new Game(boardSize);
    this.players = {
      X: { name: players.X, wins: 0 },
      O: { name: players.O, wins: 0 }
    };
  }

  resetGame(boardSize) {
    this.game = new Game(boardSize, this.defender);
  }

  fillCell(row, col, callback) {
    if (this.game.inProgress && this.game.isOpen(row, col)) {
      this.game.setCell(row, col);
      callback(this.game.current, this._getStatusMessage(row, col));
    }
  }

  _getStatusMessage(row, col) {
    this.game.inProgress = false;
    if (this.game.isWinner(row, col, this.game.current)) {
      this.defender = this.game.current;
      this.players[this.game.current].wins++;
      return `Player ${this.players[this.game.current].name} won!`;
    } else if (this.game.turns === this.game.maxTurns) {
      return "It's a tie!";
    } else {
      this.game.inProgress = true;
      this.game.rotateBoard();
      this.game.applyGravity();
      this.game.current = this.game.current === "X" ? "O" : "X";
      return "";
    }
  }
}
