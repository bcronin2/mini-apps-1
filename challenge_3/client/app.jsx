class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      step: 0,
      new: true,
      stepData: {},
      formData: new Array(4)
    };
  }

  componentDidUpdate() {
    let inputs = document.getElementsByTagName("input");
    if (inputs.length) {
      for (let i = 0; i < inputs.length; i++) {
        let prefillData = this.state.formData[this.state.step];
        inputs[i].value =
          prefillData && prefillData[inputs[i].id]
            ? prefillData[inputs[i].id]
            : "";
      }
      inputs[0].focus();
    }
  }

  handleChange(fieldId) {
    this.state.stepData[fieldId] = document.getElementById(fieldId).value;
  }

  logIn() {}

  nextScreen() {
    if (this.state.step > 0) {
      this.state.formData[this.state.step] = this.state.stepData;
      this.state.stepData = this.state.formData[this.state.step + 1] || {};
    }
    this.setState({ step: this.state.step + 1 });
  }

  prevScreen() {
    this.state.stepData = this.state.formData[this.state.step - 1] || {};
    this.setState({ step: this.state.step - 1 });
  }

  checkout() {
    // this.postData(this.state.data);
    this.nextScreen();
  }

  render() {
    let content;
    let next = <button onClick={this.nextScreen.bind(this)}>Next</button>;
    let prev = <button onClick={this.prevScreen.bind(this)}>Next</button>;
    if (this.state.step === 0) {
      return (
        <div className="content">
          <div className="title">Welcome!!!</div>
          <div className="body">Select what you'd like to purchase...</div>
          <div className="nav">
            <button onClick={this.nextScreen.bind(this)}>Continue</button>
          </div>
        </div>
      );
    } else if (this.state.step === 1) {
      return (
        <div className="content">
          <div className="title">Step 1: Sign up</div>
          <div className="body">
            {this.inputElement(
              "username",
              "Enter a username...",
              this.state.stepData
            )}
            {this.inputElement("email", "Enter your email...")}
            {this.inputElement("password", "Enter a password...", "password")}
          </div>
          <div className="nav">
            <button onClick={this.prevScreen.bind(this)}>Nevermind.</button>
            <button onClick={this.nextScreen.bind(this)}>Continue</button>
          </div>
        </div>
      );
    } else if (this.state.step === 2) {
      return (
        <div className="content">
          <div className="title">Step 2: Enter address</div>
          <div className="body">
            {this.inputElement("name", "Recipient's full name")}
            {this.inputElement("street_1", "Street address 1")}
            {this.inputElement("street_2", "Street address 2 (optional)")}
            {this.inputElement("city", "City")}
            {this.inputElement("state", "State")}
            {this.inputElement("zip", "Zip code")}
          </div>
          <div className="nav">
            <button onClick={this.prevScreen.bind(this)}>Go back</button>
            <button onClick={this.nextScreen.bind(this)}>Continue</button>
          </div>
        </div>
      );
    } else if (this.state.step === 3) {
      return (
        <div className="content">
          <div className="title">Step 3: Enter payment info</div>
          <div className="body">
            {this.inputElement("holder_name", "Cardholder's full name")}
            {this.inputElement("card_number", "Card number")}
            {this.inputElement("ccv_number", "CCV")}
            {this.inputElement("expiration", "exp date")}
          </div>
          <div className="nav">
            <button onClick={this.prevScreen.bind(this)}>Go back</button>
            <button onClick={this.checkout.bind(this)}>Purchase!</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="content">
          <div className="title">Thanks for your purchase!</div>
          <div className="body">You just bought some stuff.</div>
          <div className="nav">
            <button onClick={() => this.setState({ step: 0 })}>
              Go back home
            </button>
          </div>
        </div>
      );
    }
  }

  inputElement(id, placeholder, type) {
    return (
      <input
        id={id}
        // value={this.state.stepData ? this.state.stepData[id] : ""}
        placeholder={placeholder}
        onChange={() => this.handleChange(id)}
        type={type ? type : "text"}
      />
    );
  }
}

App.defaultProps = {
  stepNames: {
    1: "accounts",
    2: "addresses",
    3: "cards"
  }
};

ReactDOM.render(<App />, document.getElementById("app"));
