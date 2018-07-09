window.board = {
  init: function(boardSize) {
    this.size = boardSize;
    this.board = this._initGrid(boardSize);
  },

  setCell: function(row, col, type) {
    this.board[row][col] = type;
  },

  isWinner: function(row, col, type) {
    return (
      this._isRowWinner(row, type) ||
      this._isColWinner(col, type) ||
      this._isMajDiagonalWinner(type) ||
      this._isMinDiagonalWinner(type)
    );
  },

  _isRowWinner: function(row, type) {
    return this.board[row].reduce(
      (isWinning, cell) => cell === type && isWinning,
      true
    );
  },

  _isColWinner: function(col, type) {
    return this.board.reduce(
      (isWinning, row) => row[col] === type && isWinning,
      true
    );
  },

  _isMajDiagonalWinner: function(type) {
    isWinning = true;
    this.board.forEach(
      (row, index) => (isWinning = row[index] === type && isWinning)
    );
    return isWinning;
  },

  _isMinDiagonalWinner: function(type) {
    isWinning = true;
    this.board.forEach(
      (row, index) =>
        (isWinning = row[this.size - index - 1] === type && isWinning)
    );
    return isWinning;
  },

  _initGrid: function(size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
      arr.push([]);
      for (var j = 0; j < size; j++) {
        arr[i].push(null);
      }
    }
    return arr;
  }
};
