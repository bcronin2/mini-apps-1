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
  if (props.players[0].wins || props.players[1].wins) {
    records = (
      <div>
        <div className="title">Records</div>
        <div className="R">
          {props.players[0].name} wins: {props.players[0].wins}
        </div>
        <div className="B">
          {props.players[1].name} wins: {props.players[1].wins}
        </div>
      </div>
    );
  }
  return (
    <div className="game-details">
      <div>
        <div className="title">Players</div>
        <div className={`R ${props.current === 0 ? "bold" : ""}`}>
          Red: {props.players[0].name}
        </div>
        <div className={`B ${props.current === 1 ? "bold" : ""}`}>
          Black: {props.players[1].name}
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
