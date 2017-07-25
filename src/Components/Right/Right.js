import React from "react";
import Table from "../../Components/Table/Table";
import "./Right.css";

var Right = props => {
  return (
    <div id="right">
      <h2>CSV Preview</h2>
      <Table tabled={props.tabled} />
    </div>
  );
};

export default Right;
