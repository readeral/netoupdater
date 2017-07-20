import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);
  }

  renderList(data) {
    return data.map((row, index) => (
      <tr key={index}>
        {this.renderSublist(row, index)}
        <td>
          <form onSubmit={this.handleFormSubmit}>
            {this.createCheckbox(index)}
          </form>
        </td>
      </tr>
    ));
  }

  renderSublist(row, index) {
    if (index === 0) {
      return row.map((val, index) => <th key={index}>{val}</th>);
    }
    return row.map((val, index) => <td key={index}>{val}</td>);
  }

  handleFormSubmit() {}

  toggleCheckbox() {}

  createCheckbox(index) {
    return (
      <input className="form-checkbox" name={"n" + index} type="checkbox" />
    );
  }

  render() {
    return (
      <div id="table">
        <table id="cooltable">
          <tbody>
            {this.renderList(this.props.tabled)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
