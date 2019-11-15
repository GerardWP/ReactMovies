import React from "react";
import ResultsContainer from "./ResultsContainer";

function Home(props) {
  console.log("home props");
  console.log(props);
  if (props.loggedIn && props.canRender) {
    return (
      <div className="homePge">
        <ResultsContainer
          results={props.results}
          handler={props.handler}
          targetID={props.targetID}
        />
      </div>
    );
  } else {
    return (
      <div className="homePge">
        <h1>Homepage.</h1>
      </div>
    );
  }
}

export default Home;

// {props.selection.length > 0
//   ? props.selection.map(res => {
//       console.log("mapping");
//       console.log(res);
//       return (
//         <div key={res.id}>

//           <h1>{res.media_type === "movie" ? res.title : res.name}</h1>
//         </div>
//       );
//     })
//   : null}
