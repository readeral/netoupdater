import React, { Component } from "react";
import RenderList from "./RenderList";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {}

  render() {
    return (
      <div id="table">
        <table id="cooltable">
          <RenderList
            data={this.props.tabled}
            onSubmit={this.handleFormSubmit}
          />
        </table>
      </div>
    );
  }
}

export default Table;
