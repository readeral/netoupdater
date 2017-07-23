import React, { Component } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import "./MethodToggle.css";

class MethodToggle extends Component {
  render() {
    return (
      <RadioGroup
        id="method-field"
        name="method"
        selectedValue={this.props.valueMethod}
        onChange={option => {
          this.props.handleChange(option);
        }}
      >
        <Radio value="increment" id="increment" />
        <label htmlFor="increment" className="button-simple label100">
          Increment
        </label>

        <Radio value="decrement" id="decrement" />
        <label htmlFor="decrement" className="button-simple label100">
          Decrement
        </label>
        <Radio value="set" id="set" />
        <label htmlFor="set" className="button-simple label100">Set</label>
      </RadioGroup>
    );
  }
}

export default MethodToggle;
