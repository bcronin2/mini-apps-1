const React = require("react");
const PropTypes = require("prop-types");

const Board = props => {
  let newGameButton = "";
  if (props.turnCounter) {
    newGameButton = <button onClick={props.startNewGame}>New game</button>;
  }
  return (
    <div className="controls">
      <button onClick={props.setN}>Change board size</button>
      {newGameButton}
    </div>
  );
};

Board.propTypes = {
  results: PropTypes.array.isRequired
};

module.exports = Board;
