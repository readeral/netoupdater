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
            className={
              this.props.param === false
                ? "button button-blue"
                : "button button-inactive"
            }
            id="preview-button"
          >
            Preview API call
          </button>
          <button
            onClick={this.props.send}
            className={
              this.props.param === false
                ? "button button-blue"
                : "button button-inactive"
            }
          >
            {this.props.waiting.a === true ? <Loader /> : "Update quantity"}
          </button>
          <button
            onClick={this.props.receive}
            className={
              this.props.param === false
                ? "button button-blue"
                : "button button-inactive"
            }
          >
            {this.props.waiting.b === true ? <Loader /> : "Get quantity"}
          </button>
        </div>
        <div id="reset-group">
          <Reset hasdata={this.props.hasdata} onClear={this.props.onClear} />
        </div>
      </div>
    );
  }
}

export default ControlPanel;
