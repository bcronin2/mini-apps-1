const React = require("react");
const Board = require("./board.jsx");
const Details = require("./gameDetails.jsx");
const Controls = require("./gameControls.jsx");
const helpers = require("./gameHelpers.js");

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      N: 4,
      grid: helpers.newGrid(7, 6),
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
      grid: helpers.newGrid(this.state.N + 3, this.state.N + 2),
      current: this.state.defender || "R",
      turnCounter: 0
    });
  }

  dropDisc(col) {
    let row = 0;
    while (!this.state.grid[col][row] && row < this.state.grid[0].length) {
      row++;
    }
    let updatedGrid = this.state.grid.slice();
    updatedGrid[col][--row] = this.state.current;
    this.setState({ grid: updatedGrid }, () =>
      this.checkWinOrTie(col, row, this.endTurn.bind(this))
    );
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
    let players = Object.assign({}, this.state.players);
    players[this.state.current].wins++;
    this.setState({ players: players });

    let newGame = confirm(message);
    if (newGame) {
      this.setState(
        { defender: this.state.current },
        this.startNewGame.bind(this)
      );
    }
  }

  setN() {
    let newN = parseInt(prompt("New number to connect:")) || 4;
    this.setState({ N: newN }, this.startNewGame.bind(this));
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

  render() {
    return (
      <div className="game">
        <Board grid={this.state.grid} handleClick={this.dropDisc.bind(this)} />
        <Details
          players={this.state.players}
          current={this.state.current}
          defender={this.state.defender}
        />
        <Controls
          turnCounter={this.state.turnCounter}
          startNewGame={this.startNewGame.bind(this)}
          setN={this.setN.bind(this)}
        />
      </div>
    );
  }
}

module.exports = Game;
