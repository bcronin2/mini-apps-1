class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      userData: {},
      currentData: {},
      currentForm: "F1"
    };
  }

  nextScreen() {
    // send current data to server
    // add current data to userData
    // change currentForm
  }

  prevScreen() {
    //change currentForm
  }

  checkout() {
    // send data to server
    // refresh state
  }

  render() {
    return <div>Hello, world!</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("dialog"));
