import React, { Component } from "react";
import "./Drop.css";
import Dropzone from "react-dropzone";

class Drop extends Component {
  render() {
    return (
      <div>
        <div className="dropzone">
          <Dropzone
            accept="text/csv"
            onDropAccepted={this.props.onDropped.bind(this)}
            onDropRejected={this.props.onDropRejected.bind(this)}
            className="left-box dropzone-colour"
            activeClassName={"active-colour"}
            rejectClassName={"reject-colour"}
          >
            Drag and drop a file here
            {this.props.ready}
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default Drop;
