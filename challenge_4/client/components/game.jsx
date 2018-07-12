const React = require("react");
const Board = require("./board.jsx");

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // initialize game elements--dimensions, players, defender, current player, grid, winner, number of turns
    // grid will be array of strings; max string length will be height, and number of strings will be width
    // state will also need N-value - will generate dimensions/grid from this
  }

  componentDidMount() {
    this.startGame();
  }

  startGame() {
    // get player names
    // set default N, dimensions
    // initialize
    //// grid
    //// defender/current player
    //// turnCounter
  }

  endGame(message) {}

  dropDisc(col) {
    // click handler for board (only call if you can drop a disc)
    // updates grid for given column, and updates number of turns, using setState
    // in callback, checks if there is a winner, or if there is a tie, and switches current player
    //// if the game is over, send a message to endGame
  }

  checkWinner(col, row) {
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

  render() {
    return (
      <Board
        grid={this.state.grid}
        height={this.state.height}
        clickHandler={this.dropDisc.bind(this)}
      />
    );
  }
}

Game.defaultProps = {};

module.exports = Game;
