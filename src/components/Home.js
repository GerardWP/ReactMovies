import React from "react";

function Home(props) {
  if (props.loggedIn) {
    return (
      <div className="homePge">
        <h1>Welcome, {props.username}</h1>
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
