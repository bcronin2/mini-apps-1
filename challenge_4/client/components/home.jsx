const React = require("react");

const Home = props => (
  <div className="menu-list">
    <div id="game" onClick={props.handleViewClick}>
      Play Game
    </div>
  </div>
);

module.exports = Home;
