module.exports = {
  checkCol: function(col, row, ctx) {
    let counter = 1;
    while (++row < ctx.grid[0].length) {
      if (ctx.grid[col][row] !== ctx.current) {
        break;
      }
      counter++;
      if (counter >= ctx.N) {
        return true;
      }
    }
    return false;
  },

  checkRow: function(col, row, ctx) {
    let counter = 1;
    let colLeft = col;
    let colRight = col;
    while (colLeft-- > 0) {
      if (ctx.grid[colLeft][row] !== ctx.current) {
        break;
      }
      counter++;
      if (counter >= ctx.N) {
        return true;
      }
    }
    while (++colRight < ctx.grid.length) {
      if (ctx.grid[colRight][row] !== ctx.current) {
        break;
      }
      counter++;
      if (counter >= ctx.N) {
        return true;
      }
    }
    return false;
  },

  checkMajDiagonal: function(col, row, ctx) {
    let counter = 1;
    let colLeft = col;
    let rowLeft = row;
    let colRight = col;
    let rowRight = row;
    while (colLeft-- > 0 && rowLeft-- > 0) {
      if (ctx.grid[colLeft][rowLeft] !== ctx.current) {
        break;
      }
      counter++;
      if (counter >= ctx.N) {
        return true;
      }
    }
    while (++colRight < ctx.grid.length && ++rowRight < ctx.grid[0].length) {
      if (ctx.grid[colRight][rowRight] !== ctx.current) {
        break;
      }
      counter++;
      if (counter >= ctx.N) {
        return true;
      }
    }
    return false;
  },

  checkMinDiagonal: function(col, row, ctx) {
    let counter = 1;
    let colLeft = col;
    let rowLeft = row;
    let colRight = col;
    let rowRight = row;
    while (colLeft-- > 0 && ++rowRight < ctx.grid[0].length) {
      if (ctx.grid[colLeft][rowRight] !== ctx.current) {
        break;
      }
      counter++;
      if (counter >= ctx.N) {
        return true;
      }
    }
    while (++colRight < ctx.grid.length && rowLeft-- > 0) {
      if (ctx.grid[colRight][rowLeft] !== ctx.current) {
        break;
      }
      counter++;
      if (counter >= ctx.N) {
        return true;
      }
    }
    return false;
  }
};
