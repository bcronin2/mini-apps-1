const React = require("react");

const Details = props => {
  let defender = "";
  let records = "";
  if (props.defender) {
    defender = (
      <div>
        <div className="title">Reigning champ</div>
        <div className={props.defender}>
          {props.players[props.defender].name}
        </div>
      </div>
    );
  }
  if (props.players["R"].wins || props.players["B"].wins) {
    records = (
      <div>
        <div className="title">Records</div>
        <div className="B">
          {props.players["R"].name} wins: {props.players["R"].wins}
        </div>
        <div className="B">
          {props.players["B"].name} wins: {props.players["B"].wins}
        </div>
      </div>
    );
  }
  return (
    <div className="game-details">
      <div>
        <div className="title">Players</div>
        <div className={`R ${props.current === "R" ? "bold" : ""}`}>
          Red: {props.players["R"].name}
        </div>
        <div className={`B ${props.current === "B" ? "bold" : ""}`}>
          Black: {props.players["B"].name}
        </div>
      </div>
      <hr />
      {records}
      <hr />
      {defender}
    </div>
  );
};

module.exports = Details;
