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

  endGame(message) {}

  checkWinOrTie(col, row, cb) {
    cb("");
    // return checkCol || checkRow || checkMajDiagonal || checkMinDiagonal
  }

  checkCol(col, row) {
    // initialize consec counter
    // look down until...
    //// you reach the bottom
    //// next !== current
    //// you've found N consecutive equal to current
  }

  checkRow(col, row) {
    // initialize consec counter
    //// look to the left until...
    //// you reach undefined
    //// next !== current
    // you've found N consecutive equal to current
    //// look to the right until...
    //// you reach undefined
    //// next !== current
    //// you've found N consecutive equal to current
  }

  checkMajDiagonal(col, row) {
    // similar to checkRow, but diagonal (top left to bottom right)
  }

  checkMinDiagonal(col, row) {
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
