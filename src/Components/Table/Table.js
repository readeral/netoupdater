import React, { Component } from "react";
import RenderList from "./RenderList";
import "./Table.css";

class Table extends Component {
  render() {
    return (
      <div className="tab-content" id="table">
        <table id="cooltable">
          {this.props.tabled.map((one, index) => (
            <RenderList key={index + "-tabled"} data={one} />
          ))}
        </table>
      </div>
    );
  }
}

export default Table;
