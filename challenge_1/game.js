class Game {
  constructor(boardSize, defender) {
    this.size = boardSize;
    this.board = this._initGrid(boardSize);
    this.inProgress = true;
    this.current = defender || "X";
    this.turns = 0;
    this.maxTurns = boardSize * boardSize;
  }

  isOpen(row, col) {
    return !this.board[row][col];
  }

  setCell(row, col) {
    this.board[row][col] = this.current;
    this.turns++;
  }

  isWinner(row, col) {
    return (
      this._isRowWinner(row) ||
      this._isColWinner(col) ||
      this._isMajDiagonalWinner() ||
      this._isMinDiagonalWinner()
    );
  }

  _isRowWinner(row) {
    return this.board[row].reduce(
      (isWinning, cell) => cell === this.current && isWinning,
      true
    );
  }

  _isColWinner(col) {
    return this.board.reduce(
      (isWinning, row) => row[col] === this.current && isWinning,
      true
    );
  }

  _isMajDiagonalWinner() {
    var isWinning = true;
    this.board.forEach(
      (row, index) => (isWinning = row[index] === this.current && isWinning)
    );
    return isWinning;
  }

  _isMinDiagonalWinner() {
    var isWinning = true;
    this.board.forEach(
      (row, index) =>
        (isWinning = row[this.size - index - 1] === this.current && isWinning)
    );
    return isWinning;
  }

  _initGrid(size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
      arr.push([]);
      for (var j = 0; j < size; j++) {
        arr[i].push(null);
      }
    }
    return arr;
  }
}
