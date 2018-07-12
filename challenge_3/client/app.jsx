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
        let prefillData = this.state.formData[this.state.stepIndex];
        inputs[i].value =
          prefillData && prefillData[inputs[i].id]
            ? prefillData[inputs[i].id]
            : "";
      }
      inputs[0].focus();
    }
  }

  handleChange(event) {
    let element = event.target;
    let fieldValue = element.value;
    let fieldId = element.id;
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
    if (this.props.stepNames[this.state.step]) {
      this.state.formData[this.state.stepName] = this.state.stepData;
    }
    this.setStep(this.state.stepIndex + 1);
  }

  prevStep() {
    this.state.formData[this.state.stepName] = this.state.stepData;
    this.setStep(this.state.stepIndex - 1);
  }

  setStep(index) {
    this.setState(
      { stepIndex: index, stepName: this.props.stepNames[index] },
      () =>
        (this.state.stepData = this.state.formData[this.state.stepName] || {})
    );
  }

  refresh() {
    this.setState({
      id: 0,
      stepIndex: 0,
      stepName: "",
      stepData: {},
      formData: {}
    });
  }

  render() {
    if (this.state.stepIndex === 0) {
      return <HomePage next={this.nextStep.bind(this)} />;
    } else if (this.state.stepIndex === 1) {
      return (
        <FormStep
          title="Step 1: Create account"
          fields={[
            { id: "username", text: "Username" },
            { id: "email", text: "Email address" },
            { id: "password", text: "Password" }
          ]}
          navs={[
            { action: this.prevStep.bind(this), name: "Never mind" },
            { action: this.nextStep.bind(this), name: "Continue" }
          ]}
        />
      );
    } else if (this.state.stepIndex === 2) {
      return (
        <FormStep
          title="Step 2: Enter address"
          fields={[
            { id: "name", text: "Recipient's full name" },
            { id: "street_1", text: "Street address 1" },
            { id: "street_2", text: "Street address 2 (optional)" },
            { id: "city", text: "City" },
            { id: "state", text: "State" },
            { id: "zip", text: "Zip code" }
          ]}
          navs={[
            { action: this.prevStep.bind(this), name: "Go back" },
            { action: this.nextStep.bind(this), name: "Continue" }
          ]}
        />
      );
    } else if (this.state.stepIndex === 3) {
      return (
        <FormStep
          title="Step 3: Enter payment info"
          fields={[
            { id: "card_holder", text: "Cardholder's full name" },
            { id: "card_number", text: "Card number" },
            { id: "ccv_number", text: "CCV" },
            { id: "expiration", text: "Exp date" }
          ]}
          navs={[
            { action: this.prevStep.bind(this), name: "Go back" },
            { action: this.nextStep.bind(this), name: "Confirmation" }
          ]}
        />
      );
    } else if (this.state.stepIndex === 4) {
      return (
        <Confirmation
          next={this.nextStep.bind(this)}
          prev={this.prevStep.bind(this)}
          handleChange={this.handleChange.bind(this)}
          data={this.state.formData}
        />
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

let FormStep = props => (
  <div className="content">
    <div className="title">{props.title}</div>
    <div className="body">
      {props.fields.map(field =>
        createInput(field.id, field.text, field.type, props.handleChange)
      )}
    </div>
    <div className="nav">
      {props.navs.map(nav => <button onClick={nav.action}>{nav.name}</button>)}
    </div>
  </div>
);

let HomePage = props => (
  <div className="content">
    <div className="title">Welcome!!!</div>
    <div className="body">Select what you'd like to purchase...</div>
    <div className="nav">
      <button onClick={props.next}>Continue</button>
    </div>
  </div>
);

let Confirmation = props => (
  <div className="content">
    <div className="title">Step 4: Confirm your details</div>
    <div className="body">
      {props.data.map(stepData => {
        if (stepData.length) {
          return Object.keys(stepData).map(field => (
            <div>{stepData[field]}</div>
          ));
        }
      })}
    </div>
    <div className="nav">
      <button onClick={props.prev}>Go back</button>
      <button onClick={props.next}>Purchase!</button>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
