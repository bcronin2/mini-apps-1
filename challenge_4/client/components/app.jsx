const React = require("react");
const Game = require("./game.jsx");
// import { Search } from "./Search.jsx";
// import { Filter } from "./Filter.jsx";
// import { FindAndAdd } from "./FindAndAdd.jsx";
// import IMDB from "../lib/IMDB.js";
// import movieCollection from "../lib/movieCollection.js";

class App extends React.Component {
  render() {
    return (
      <div>
        <div class="banner">
          <div>Connect N</div>
        </div>
        <div className="content">
          <Game />
        </div>
      </div>
    );
  }
}

App.defaultProps = {};

module.exports = App;
