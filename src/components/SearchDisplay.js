import React from "react";

function SearchDisplay(props) {
  const results = props.results;
  return (
    <div id="relatedRes">
      {results.map(res => {
        return (
          <div key={res.id} className="resBox">
            <h1>{res.media_type === "movie" ? res.title : res.name}</h1>
            <h2>Main</h2>
            <span
              onClick={() => props.handler(res.media_type, res.id)}
              tabIndex="0"
              onKeyDown={e =>
                e.key === "Enter" ? props.handler(res.media_type, res.id) : null
              }
            >
              click
            </span>
          </div>
        );
      })}
    </div>
  );
}
export default SearchDisplay;
