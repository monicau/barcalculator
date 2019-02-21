import React from "react"
import kiloPlates from "../kilo"

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plates: {
        zeroFive: true,
        oneFive: true,
        two: true,
        twoFive: true,
        five: true,
        ten: true,
        fifteen: true,
        twenty: true,
        twentyFive: true,
      }
    };
  }
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      plates: {
        ...this.state.plates,
        [name]: value
      }
    });

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <label>0.5kg
          <input
            name="zeroFive"
            type="checkbox"
            checked={this.state.plates.zeroFive}
            onChange={this.handleInputChange} />
        </label>
        <label>1.5kg
          <input
            name="oneFive"
            type="checkbox"
            checked={this.state.plates.oneFive}
            onChange={this.handleInputChange} />
        </label>
        
      </div>
    );
  }
}