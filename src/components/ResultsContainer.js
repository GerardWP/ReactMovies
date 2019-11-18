import React from "react";
import SearchDisplay from "./SearchDisplay";

function ResultsContainer(props) {
  let results = props.resRender;
  let style = {
    bg: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundColor: "#222"
    }
  };
  let bgStyle;

  if (results.length === 1) {
    results = results[0];
    results.backdrop_path
      ? (bgStyle = {
          ...style.bg,
          backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${results.backdrop_path})`
        })
      : (bgStyle = style.bg);
    console.log(results);
    console.log(bgStyle);
    return (
      <div id="resultContainer" style={bgStyle}>
        <div>
          <div key={results.id} id="target">
            <h1>{results.title || results.name}</h1>
            <h2>Main</h2>
            <span onClick={() => console.log(results.id)}>click</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <SearchDisplay
        findGenre={props.findGenre}
        results={results}
        handler={props.handler}
        genres={props.genres}
      />
    );
  }
}

export default ResultsContainer;
