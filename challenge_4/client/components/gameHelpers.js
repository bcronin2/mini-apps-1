module.exports = {
  checkCol: function(col, row, state) {
    let counter = 1;
    while (++row < state.grid[0].length) {
      if (state.grid[col][row] !== state.current) {
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
    while (--colLeft >= 0) {
      if (state.grid[colLeft][row] !== state.current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    while (++colRight < state.grid.length) {
      if (state.grid[colRight][row] !== state.current) {
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
    while (--colLeft >= 0 && --rowLeft >= 0) {
      if (state.grid[colLeft][rowLeft] !== state.current) {
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
      if (state.grid[colRight][rowRight] !== state.current) {
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
    while (--colLeft >= 0 && ++rowRight < state.grid[0].length) {
      if (state.grid[colLeft][rowRight] !== state.current) {
        break;
      }
      counter++;
      if (counter >= state.N) {
        return true;
      }
    }
    while (++colRight < state.grid.length && --rowLeft >= 0) {
      if (state.grid[colRight][rowLeft] !== state.current) {
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

  finalizeGame: function(state, callback) {
    let winner = state.current;
    let loser = winner === "R" ? "B" : "R";
    let data = {
      winner: state.players[winner].name,
      loser: state.players[loser].name,
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
      .then(response => response)
      .then(response => console.log(JSON.stringify(response.body.toString)));
  }
};
