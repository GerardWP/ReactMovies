import React from "react";
import SearchDisplay from "./SearchDisplay";

function ResultsContainer(props) {
  let results = props.resRender;
  console.log("resssyyyy");
  console.log(results);

  if (results.length === 1) {
    results = results[0];
    console.log("rendering this");
    console.log(results);
    return (
      <div id="resultContainer">
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
        results={results}
        handler={props.handler}
        genres={props.genres}
      />
    );
  }
}

export default ResultsContainer;
