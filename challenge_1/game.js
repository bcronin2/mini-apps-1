class Game {
  constructor(boardSize, defender) {
    this.boardSize = boardSize;
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

  rotateBoard() {
    var oldBoard = this.board;
    var newBoard = this._initGrid(this.boardSize);
    for (var i = 0; i < this.boardSize; i++) {
      for (var j = 0; j < this.boardSize; j++) {
        newBoard[i][j] = oldBoard[j][this.boardSize - i - 1];
      }
    }
    this.board = newBoard;
  }

  applyGravity() {
    for (var i = this.boardSize - 2; i >= 0; i--) {
      for (var j = 0; j < this.boardSize; j++) {
        var cellValue = this.board[i][j];
        if (cellValue) {
          var nextRow = i + 1;
          while (nextRow < this.boardSize && !this.board[nextRow][j]) {
            nextRow++;
          }
          this.board[i][j] = null;
          this.board[nextRow - 1][j] = cellValue;
        }
      }
    }
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
        (isWinning =
          row[this.boardSize - index - 1] === this.current && isWinning)
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
