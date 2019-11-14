import React from "react";

function Predictive(props) {
  if (props.res && props.query !== "") {
    return (
      <ul id="predictive">
        {props.res.map(res => {
          return <li key={res.id}>{res.title}</li>;
        })}
      </ul>
    );
  } else return <span></span>;
}

export default Predictive;
