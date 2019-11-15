import React from "react";

function Predictive(props) {
  if (props.res && props.query !== "") {
    let results = props.res;
    if (props.res.length >= 6) {
      results = results.splice(0, 6);
    }
    return (
      <ul id="predictive">
        <div className="fader"></div>
        {results.map(res => {
          return (
            <li key={res.id} tabIndex="0">
              {res.media_type === "movie" ? res.title : res.name}
            </li>
          );
        })}
      </ul>
    );
  } else return <span></span>;
}

export default Predictive;
