import React from "react";

function Predictive(props) {
  let results = props.res;
  if (results && props.query !== "") {
    if (results.length >= 6) {
      results = results.splice(0, 6);
    }
    return (
      <ul id="predictive">
        <div className="fader"></div>
        {results.map(res => {
          return (
            <li
              key={res.id}
              tabIndex="0"
              onClick={event => {
                props.setRender(true);
                props.setQuery("");
                props.handleSubmit(
                  res.media_type === "movie"
                    ? res.title.toLowerCase()
                    : res.name.toLowerCase(),
                  event
                );
              }}
            >
              {res.media_type === "movie" ? res.title : res.name}
            </li>
          );
        })}
      </ul>
    );
  } else return <span></span>;
}

// export default Predictive;
