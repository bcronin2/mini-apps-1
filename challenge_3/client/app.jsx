class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.refresh();
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
    let fieldValue = document.getElementById(fieldId).value;
    if (fieldId === "password") {
      this.state.stepData[fieldId] = fieldValue.hashCode();
    } else {
      this.state.stepData[fieldId] = fieldValue;
    }
  }

  createAccount() {
    postData(
      this.props.createUrl,
      this.state.stepData,
      this.nextStep.bind(this)
    );
  }

  checkout() {
    postData(
      this.props.submitUrl,
      this.state.formData,
      this.nextStep.bind(this)
    );
  }

  nextStep() {
    if (1 <= this.state.step && this.state.step <= 3) {
      this.state.formData[this.state.step] = this.state.stepData;
      this.state.stepData = this.state.formData[this.state.step + 1] || {};
    }
    this.setState({ step: this.state.step + 1 });
  }

  prevStep() {
    this.state.formData[this.state.step] = this.state.stepData;
    this.state.stepData = this.state.formData[this.state.step - 1] || {};
    this.setState({ step: this.state.step - 1 });
  }

  refresh() {
    this.setState({
      id: 0,
      step: 0,
      new: true,
      stepData: {},
      formData: new Array(4)
    });
  }

  render() {
    if (this.state.step === 0) {
      return (

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
            <button onClick={this.prevStep.bind(this)}>Nevermind.</button>
            <button onClick={this.createAccount.bind(this)}>
              Create account
            </button>
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
            <button onClick={this.prevStep.bind(this)}>Go back</button>
            <button onClick={this.nextStep.bind(this)}>Continue</button>
          </div>
        </div>
      );
    } else if (this.state.step === 3) {
      return (
        <div className="content">
          <div className="title">Step 3: Enter payment info</div>
          <div className="body">
            {this.inputElement("card_holder", "Cardholder's full name")}
            {this.inputElement("card_number", "Card number")}
            {this.inputElement("ccv_number", "CCV")}
            {this.inputElement("expiration", "exp date", "date")}
          </div>
          <div className="nav">
            <button onClick={this.prevStep.bind(this)}>Go back</button>
            <button onClick={this.nextStep.bind(this)}>Confirmation</button>
          </div>
        </div>
      );
    } else if (this.state.step === 4) {
      return (
        <div className="content">
          <div className="title">Step 4: Confirm your details</div>
          <div className="body">
            {this.state.formData.map(stepData => {
              if (stepData.length) {
                return Object.keys(stepData).map(field => (
                  <div>{stepData[field]}</div>
                ));
              }
            })}
            {console.log(this.state.formData)}
          </div>
          <div className="nav">
            <button onClick={this.prevStep.bind(this)}>Go back</button>
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
            <button onClick={this.refresh.bind(this)}>Go back home</button>
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
  createUrl: "/create",
  validateUrl: "/validate",
  submitUrl: "/submit",
  stepNames: {
    1: "accounts",
    2: "addresses",
    3: "cards"
  }
};



ReactDOM.render(<App />, document.getElementById("app"));
