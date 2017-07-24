import React, { Component } from "react";
import "./MetaControls.css";

class MetaControls extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="meta-control" className={this.props.class}>
        <button
          id="param-button"
          onClick={this.props.switchState}
          className={
            this.props.active === true
              ? "button button-blue"
              : "button button-green"
          }
        >
          {this.props.switch === true ? "Close" : "Parameters"}
        </button>
        <button
          id="about-button"
          onClick={this.props.handleAbout}
          className={
            this.props.active === true
              ? "button button-blue"
              : "button button-inactive"
          }
        >
          About
        </button>
        <button
          id="empty-button"
          onClick={this.props.handleClear}
          className={
            this.props.active === true
              ? "button button-blue"
              : "button button-inactive"
          }
        >
          Clear Console
        </button>
      </div>
    );
  }
}

export default MetaControls;
