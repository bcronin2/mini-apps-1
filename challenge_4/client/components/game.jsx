const React = require("react");
const Board = require("./board.jsx");

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      N: 4,
      grid: this.newGrid(7, 6),
      height: 6,
      current: "R",
      turnCounter: 0
    };

    // initialize game elements--dimensions, players, defender, current player, grid, winner, number of turns
    // grid will be array of strings; max string length will be height, and number of strings will be width
    // state will also need N-value - will generate dimensions/grid from this
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
      grid: this.newGrid(this.state.N + 3),
      height: this.state.N + 2,
      current: this.state.defender || "R",
      turnCounter: 0
    });
  }

  dropDisc(col) {
    if (!this.state.grid[col][0]) {
      let row = 0;
      while (!this.state.grid[col][row] && row < this.state.height) {
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
      this.startNewGame();
    }
  }

  checkWinOrTie(col, row, callback) {
    let message = "";
    let isWinner =
      this.checkCol(col, row) ||
      this.checkRow(col, row) ||
      this.checkMajDiagonal(col, row) ||
      this.checkMinDiagonal(col, row);
    if (isWinner) {
      message = `${this.state.current} won! Play again?`;
    } else if (
      this.state.turnCounter ===
      this.state.height * this.state.grid.length
    ) {
      message = "The game was a draw! Play again?";
    }
    callback(message);
  }

  checkCol(col, row) {
    let counter = 1;
    while (++row < this.state.height) {
      if (this.state.grid[col][row] !== this.state.current) {
        break;
      }
      counter++;
      if (counter >= this.state.N) {
        return true;
      }
    }
    return false;
  }

  checkRow(col, row) {
    let counter = 1;
    let colLeft = col;
    let colRight = col;
    while (colLeft-- > 0) {
      if (this.state.grid[colLeft][row] !== this.state.current) {
        break;
      }
      counter++;
      if (counter >= this.state.N) {
        return true;
      }
    }
    while (++colRight < this.state.grid.length) {
      if (this.state.grid[colRight][row] !== this.state.current) {
        break;
      }
      counter++;
      if (counter >= this.state.N) {
        return true;
      }
    }
    return false;
  }

  checkMajDiagonal(col, row) {
    return false;
    // similar to checkRow, but diagonal (top left to bottom right)
  }

  checkMinDiagonal(col, row) {
    return false;
    // similar to checkMajDiagonal, but in opposite direction
  }

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
      <Board
        grid={this.state.grid}
        height={this.state.height}
        handleClick={this.dropDisc.bind(this)}
      />
    );
  }
}

Game.defaultProps = {};

module.exports = Game;
