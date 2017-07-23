import React from "react";

const RenderList = props => (
  <tbody>
    {props.data.map((row, index) => (
      <tr key={index}>
        {index === 0
          ? row.map((val, index) => <th key={index}>{val}</th>)
          : row.map((val, index) => <td key={index}>{val}</td>)}
      </tr>
    ))}
  </tbody>
);

export default RenderList;
