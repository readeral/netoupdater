import React, { Component } from "react";
import "./Console.css";

class Console extends Component {
  render() {
    return (
      <div>
        <div id="error-console" className="left-box">
          Any errors will be output here
          <div>
            <ul>
              {this.props.console.map((f, index) => (
                <li key={index}>
                  {index} - {f[0].name} - {f[0].size} successfully uploaded
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Console;
