import React, { Component } from "react";
import "./ControlPanel.css";

class ControlPanel extends Component {
  render() {
    return (
      <div id="control-panel" className="left-box">
        <h2>Instructions</h2>
        <dl>
          <dt>Step 1.</dt>
          <dd>
            Drag and drop a CSV file above, and confirm output contains 'SKU' and 'Reorder Quantity' fields (right).
          </dd>
          <dt>Step 2.</dt>
          <dd>
            Click
            <button onClick={this.props.onParse}>
              Create JSON objects
            </button> to turn relevant data into JSON.
          </dd>
          <dt>Step 3. (opt.)</dt>
          <dd>
            Click to <button onClick={this.props.onPreview}>
              Preview concatenated result before commit
            </button>
          </dd>
          <dt>Step 4.</dt>
          <dd>
            Send the JSON values to the server by clicking
            <button onClick={this.props.send}>Update new values</button>
          </dd>
          <dt>Step 5.</dt>
          <dd>
            Check that the values have increased by clicking <button
              onClick={this.props.receive}
            >
              Download values
            </button>. The results will be visible in the browser console.
          </dd>
        </dl>
        <button
          onClick={this.props.onClear}
          id="clear-button"
          className={this.props.hasdata > 0 ? "red" : ""}
        >
          RESET
        </button>
      </div>
    );
  }
}

export default ControlPanel;
