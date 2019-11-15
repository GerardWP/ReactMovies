import React from "react";

function ResultsContainer(props) {
  const target = props.targetID;

  return (
    <div id="resultContainer">
      {props.results.length > 0
        ? props.results.map(res => {
            return (
              <>
                {res.id === target ? (
                  <div key={res.id} id="target">
                    <h1>{res.media_type === "movie" ? res.title : res.name}</h1>
                    <h2>Main</h2>
                    <span onClick={() => props.handler("MAYBE THIS WORKS")}>
                      click
                    </span>
                  </div>
                ) : (
                  <div key={res.id}>
                    <h3>{res.media_type === "movie" ? res.title : res.name}</h3>
                    <span onClick={() => props.handler("MAYBE THIS WORKS")}>
                      click
                    </span>
                  </div>
                )}
              </>
            );
          })
        : null}
    </div>
  );
}

export default ResultsContainer;
