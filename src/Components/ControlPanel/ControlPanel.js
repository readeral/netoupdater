import React, { Component } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import "./ControlPanel.css";

class ControlPanel extends Component {
  render() {
    return (
      <div id="control-panel">
        <div id="button-group">
          <button onClick={this.props.onPreview} className="orange">
            Preview API data before sending
          </button>
          <button onClick={this.props.send} className="green">
            Update stock levels
          </button>
          <button onClick={this.props.receive} className="blue">
            Retrieve stock levels
          </button>
        </div>
        <p className="small">API Update Action</p>
        <RadioGroup
          name="method"
          selectedValue={this.props.valueMethod}
          onChange={option => {
            this.props.handleChange(option);
          }}
        >
          <Radio value="increment" />Increment
          <Radio value="set" />Set
        </RadioGroup>

      </div>
    );
  }
}

export default ControlPanel;
