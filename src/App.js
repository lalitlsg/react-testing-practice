import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      hasError: false,
      input:"",
      arr: ['a','b','c']
    };
  }

  incrementCounter = () => {
    this.state.hasError
      ? this.setState({ counter: this.state.counter + 1, hasError: false })
      : this.setState({ counter: this.state.counter + 1 });
  };

  decrementCounter = () => {
    this.state.counter !== 0
      ? this.setState({
          counter: this.state.counter - 1,
        })
      : this.setState({ hasError: true });
  };

  makeCapital = (name) => {
    console.log(this.capitalize(name));
  }

  capitalize = (name) => {
    let capName = name.toUpperCase();
    return capName;
  }

  // handleInputChange = ({target}) => {
  //   this.setState({input: target.value});
  // }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="display-counter">Counter: {this.state.counter}</h1>
        {this.state.hasError && (
          <h3 data-test="error">Counter cannot be negative</h3>
        )}
        <button onClick={this.incrementCounter} data-test="increment-button">
          Increment
        </button>
        <button onClick={this.decrementCounter} data-test="decrement-button">
          Decrement
        </button>
        <hr />
        <button onClick={()=>this.makeCapital('lalit')}>Click here to capitalize</button>
        <hr />
        {/* <ul>
        {this.state.arr.map((v)=><li>{v}</li>)}
        </ul>
        <p>Some paragraph...Git Hooks </p>

        <input value={this.state.input} onChange={this.handleInputChange}/>
        <p>{this.state.input}</p> */}
      </div>
    );
  }
}

export default App;
