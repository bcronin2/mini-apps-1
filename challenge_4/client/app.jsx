const React = require("react");
// import { MovieList } from "./MovieList.jsx";
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
        <div class="content">
          <div class="body">Content goes here</div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {};

module.exports = App;
