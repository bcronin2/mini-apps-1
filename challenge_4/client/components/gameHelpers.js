module.exports = {
  checkCol: function(col, row, state) {
    let counter = 1;
    let current = state.current ? "R" : "B";
    while (++row < state.grid[0].length) {
      if (state.grid[col][row] !== current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    return false;
  },

  checkRow: function(col, row, state) {
    let counter = 1;
    let colLeft = col;
    let colRight = col;
    let current = state.current ? "R" : "B";
    while (--colLeft >= 0) {
      if (state.grid[colLeft][row] !== current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    while (++colRight < state.grid.length) {
      if (state.grid[colRight][row] !== current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    return false;
  },

  checkMajDiagonal: function(col, row, state) {
    let counter = 1;
    let colLeft = col;
    let rowLeft = row;
    let colRight = col;
    let rowRight = row;
    let current = state.current ? "R" : "B";
    while (--colLeft >= 0 && --rowLeft >= 0) {
      if (state.grid[colLeft][rowLeft] !== current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    while (
      ++colRight < state.grid.length &&
      ++rowRight < state.grid[0].length
    ) {
      if (state.grid[colRight][rowRight] !== current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    return false;
  },

  checkMinDiagonal: function(col, row, state) {
    let counter = 1;
    let colLeft = col;
    let rowLeft = row;
    let colRight = col;
    let rowRight = row;
    let current = state.current ? "R" : "B";
    while (--colLeft >= 0 && ++rowRight < state.grid[0].length) {
      if (state.grid[colLeft][rowRight] !== current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    while (++colRight < state.grid.length && --rowLeft >= 0) {
      if (state.grid[colRight][rowLeft] !== current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    return false;
  },

  newGrid: function(numCols, colHeight) {
    let grid = [];
    for (let i = 0; i < numCols; i++) {
      grid.push([]);
      for (let j = 0; j < colHeight; j++) {
        grid[i][j] = null;
      }
    }
    return grid;
  },

  saveGame: function(state, callback) {
    let data = {
      winner: state.players[state.current].name,
      loser: state.players[(state.current + 1) % 2].name,
      finalBoard: state.grid
    };
    window
      .fetch("/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      })
      .then(response => console.log(response))
      .then(callback);
  }
};
