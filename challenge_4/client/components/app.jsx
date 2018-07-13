const React = require("react");
const Home = require("./home.jsx");
const Game = require("./game.jsx");

// import IMDB from "../lib/IMDB.js";
// import movieCollection from "../lib/movieCollection.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: "home" };
  }

  handleViewClick(e) {
    this.setState({ view: e.target.id });
  }

  render() {
    let view = <Home handleViewClick={this.handleViewClick.bind(this)} />;
    if (this.state.view === "game") {
      view = <Game />;
    }
    return (
      <div>
        <div class="banner">
          <div id="home" onClick={this.handleViewClick.bind(this)}>
            Connect N
          </div>
        </div>
        <div className="content">{view}</div>
      </div>
    );
  }
}

App.defaultProps = {};

module.exports = App;
