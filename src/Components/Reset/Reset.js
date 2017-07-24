import React, { Component } from "react";
import "./Reset.css";

class Reset extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.hasdata !== nextProps.hasdata) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        onClick={this.props.onClear}
        id="clear-button"
        className={
          this.props.hasdata > 0
            ? "button button-red"
            : "button button-inactive"
        }
      >
        RESET
      </button>
    );
  }
}

export default Reset;
