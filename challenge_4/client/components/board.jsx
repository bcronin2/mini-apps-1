const React = require("react");

const Board = props => (
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
);

module.exports = Board;
