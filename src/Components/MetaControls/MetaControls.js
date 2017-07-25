import React, { Component } from "react";
import "./MetaControls.css";

class MetaControls extends Component {
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
        <a
          id="instructions-button"
          href="https://github.com/readeral/netoupdater#goals"
          rel="noopener noreferrer"
          target="_blank"
          className={
            this.props.active === true
              ? "button button-blue link-button"
              : "button button-inactive link-button"
          }
        >
          Instructions
        </a>
      </div>
    );
  }
}

export default MetaControls;
