const React = require("react");
const Board = require("./board.jsx");
const helpers = require("./boardHelpers.js");

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      N: 4,
      grid: this.newGrid(7, 6),
      current: "R",
      turnCounter: 0
    };
  }

  componentWillMount() {
    this.getPlayers();
  }

  getPlayers() {
    let playerR = prompt("Name of Player 1:");
    let playerB = prompt("Name of Player 2:");
    this.setState({
      players: {
        R: { name: playerR, wins: 0 },
        B: { name: playerB, wins: 0 }
      }
    });
  }

  startNewGame() {
    this.setState({
      grid: this.newGrid(this.state.N + 3, this.state.N + 2),
      height: this.state.N + 2,
      current: this.state.defender || "R",
      turnCounter: 0
    });
  }

  dropDisc(col) {
    if (!this.state.grid[col][0]) {
      let row = 0;
      while (!this.state.grid[col][row] && row < this.state.grid[0].length) {
        row++;
      }
      this.state.grid[col][--row] = this.state.current;
      this.checkWinOrTie(col, row, this.endTurn.bind(this));
    }
  }

  endTurn(message) {
    if (message) {
      this.endGame(message);
    } else {
      this.setState({
        turnCounter: this.state.turnCounter + 1,
        current: this.state.current === "R" ? "B" : "R"
      });
    }
  }

  endGame(message) {
    let newGame = confirm(message);
    if (newGame) {
      this.setState(
        { defender: this.state.current },
        this.startNewGame.bind(this)
      );
    }
  }

  checkWinOrTie(col, row, callback) {
    let message = "";
    let isWinner =
      helpers.checkCol(col, row, this.state) ||
      helpers.checkRow(col, row, this.state) ||
      helpers.checkMajDiagonal(col, row, this.state) ||
      helpers.checkMinDiagonal(col, row, this.state);
    if (isWinner) {
      message = `${
        this.state.players[this.state.current].name
      } won! Play again?`;
    } else if (
      this.state.turnCounter ===
      this.state.grid[0].length * this.state.grid.length
    ) {
      message = "The game was a draw! Play again?";
    }
    callback(message);
  }

  // checkCol(col, row) {
  //   let counter = 1;
  //   while (++row < this.state.grid[0].length) {
  //     if (this.state.grid[col][row] !== this.state.current) {
  //       break;
  //     }
  //     counter++;
  //     if (counter >= this.state.N) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // checkRow(col, row) {
  //   let counter = 1;
  //   let colLeft = col;
  //   let colRight = col;
  //   while (colLeft-- > 0) {
  //     if (this.state.grid[colLeft][row] !== this.state.current) {
  //       break;
  //     }
  //     counter++;
  //     if (counter >= this.state.N) {
  //       return true;
  //     }
  //   }
  //   while (++colRight < this.state.grid.length) {
  //     if (this.state.grid[colRight][row] !== this.state.current) {
  //       break;
  //     }
  //     counter++;
  //     if (counter >= this.state.N) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // checkMajDiagonal(col, row) {
  //   let counter = 1;
  //   let colLeft = col;
  //   let rowLeft = row;
  //   let colRight = col;
  //   let rowRight = row;
  //   while (colLeft-- > 0 && rowLeft-- > 0) {
  //     if (this.state.grid[colLeft][rowLeft] !== this.state.current) {
  //       break;
  //     }
  //     counter++;
  //     if (counter >= this.state.N) {
  //       return true;
  //     }
  //   }
  //   while (
  //     ++colRight < this.state.grid.length &&
  //     ++rowRight < this.state.grid[0].length
  //   ) {
  //     if (this.state.grid[colRight][rowRight] !== this.state.current) {
  //       break;
  //     }
  //     counter++;
  //     if (counter >= this.state.N) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // checkMinDiagonal(col, row) {
  //   let counter = 1;
  //   let colLeft = col;
  //   let rowLeft = row;
  //   let colRight = col;
  //   let rowRight = row;
  //   while (colLeft-- > 0 && ++rowRight < this.state.grid[0].length) {
  //     if (this.state.grid[colLeft][rowRight] !== this.state.current) {
  //       break;
  //     }
  //     counter++;
  //     if (counter >= this.state.N) {
  //       return true;
  //     }
  //   }
  //   while (++colRight < this.state.grid.length && rowLeft-- > 0) {
  //     if (this.state.grid[colRight][rowLeft] !== this.state.current) {
  //       break;
  //     }
  //     counter++;
  //     if (counter >= this.state.N) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  newGrid(numCols, colHeight) {
    let grid = [];
    for (let i = 0; i < numCols; i++) {
      grid.push([]);
      for (let j = 0; j < colHeight; j++) {
        grid[i][j] = null;
      }
    }
    return grid;
  }

  render() {
    return (
      <Board grid={this.state.grid} handleClick={this.dropDisc.bind(this)} />
    );
  }
}

Game.defaultProps = {};

module.exports = Game;
