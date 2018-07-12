const React = require("react");
const PropTypes = require("prop-types");

const Board = props => (
  <div>
    <div className="board">
      {props.grid.map((col, idx) => (
        <div
          className={`col ${col[0] ? "bar" : "allow"}`}
          onClick={() => props.handleClick(idx)}
        >
          {col.map(cell => <div className={`cell ${cell ? cell : ""}`} />)}
        </div>
      ))}
    </div>
  </div>
);

Board.propTypes = {
  results: PropTypes.array.isRequired
};

module.exports = Board;
