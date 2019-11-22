import React from "react";
import ResultsContainer from "./ResultsContainer";
let mainbg = require("../images/person-bg2.jpg");
let bgStyle = {
  bg: {
    background: `url(${mainbg}) center top no-repeat #222`,
    backgroundSize: "cover"
  }
};

function Home(props) {
  console.log("home props");
  console.log(props);
  if (props.loggedIn && props.resRender.results.length > 0) {
    return (
      <div className="homePge">
        <ResultsContainer
          findGenre={props.findGenre}
          resRender={props.resRender}
          handler={props.handler}
          targetID={props.targetID}
          genres={props.genres}
        />
      </div>
    );
  } else if (props.loggedIn && props.resRender.results.length === 0) {
    return (
      <div className="homePge" style={bgStyle.bg}>
        <h1 className="homeh1">Hello, {props.user} 😎🍿</h1>
        <h1>Happy Browsing!</h1>
      </div>
    );
  } else {
    return (
      <div className="homePge" style={bgStyle.bg}>
        <h1 className="homeh1">
          <span role="img">🍿</span> Welcome to the MovieDb!{" "}
          <span role="img">🍿</span>
        </h1>
        <h5>Please Sign Up or Log In to continue</h5>
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
