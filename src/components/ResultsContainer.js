import React from "react";
import SearchDisplay from "./SearchDisplay";
import MediaDisplay from "./MediaDisplay";
// import PersonDisplay from "./PersonDisplay";
// import StarRatings from "react-star-ratings";
// // let blankPoster = require("../images/blank.svg");
// let blankProfile = require("../images/blank-profile.svg");
function ResultsContainer(props) {
  let results = props.resRender.results;

  if (props.resRender.type === "target") {
    results = results[0];
    if (results.known_for_department) {
      return (
        //   <PersonDisplay
        //   findGenre={props.findGenre}
        //   results={results}
        //   handler={props.handler}
        //   genres={props.genres}
        // />
        <div>Person</div>
      );
    } else {
      return (
        <MediaDisplay
          findGenre={props.findGenre}
          results={results}
          handler={props.handler}
          genres={props.genres}
          collection={props.collection}
          findCollection={props.findCollection}
        />
      );
    }
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
