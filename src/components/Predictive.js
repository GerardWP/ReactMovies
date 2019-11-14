import React from "react";

function Predictive(props) {
  if (props.res && props.query !== "") {
    return (
      <ul id="predictive">
        <div className="fader"></div>
        {props.res.map(res => {
          return (
            <li key={res.id} tabIndex="0">
              {res.title}
            </li>
          );
        })}
      </ul>
    );
  } else return <span></span>;
}

export default Predictive;
