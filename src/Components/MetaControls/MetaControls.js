import React, { Component } from "react";
import "./MetaControls.css";

class MetaControls extends Component {
  render() {
    return (
      <div id="meta-control" className={this.props.class}>
        <button
          id="param-button"
          onClick={this.props.switchState}
          className="button"
        >
          {this.props.switch === true ? "Close" : "Parameters"}
        </button>
        <button
          id="about-button"
          onClick={this.props.handleAbout}
          className="button"
        >
          About
        </button>
      </div>
    );
  }
}

export default MetaControls;
