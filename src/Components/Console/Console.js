import React, { Component } from "react";
import "./Console.css";

class Console extends Component {
  render() {
    return (
      <div id="error-console">
        <ul>
          {this.props.console.map((f, index) => (
            <li key={index}>
              {index} - {f}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Console;
