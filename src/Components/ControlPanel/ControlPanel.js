import React, { Component } from "react";
import Reset from "../../Components/Reset/Reset";
import Loader from "../../Components/Loader/Loader";
import "./ControlPanel.css";

class ControlPanel extends Component {
  render() {
    return (
      <div id="control-panel">
        <div id="button-group">
          <button
            onClick={this.props.onPreview}
            className="button"
            id="preview-button"
          >
            Preview API call
          </button>
          <button
            onClick={this.props.send}
            className="button {this.props.active}"
          >
            {this.props.waiting.a === true ? <Loader /> : "Update quantity"}
          </button>
          <button onClick={this.props.receive} className="button">
            {this.props.waiting.b === true ? <Loader /> : "Get quantity"}
          </button>
        </div>
        <Reset hasdata={this.props.hasdata} onClear={this.props.onClear} />
      </div>
    );
  }
}

export default ControlPanel;
