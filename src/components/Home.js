import React from "react";

function Home(props) {
  console.log(props);
  if (props.loggedIn) {
    return (
      <div className="homePge">
        <h1>Welcome, {props.username}</h1>
        {props.results && props.canRender
          ? props.results.map(res => {
              return (
                <div key={res.id}>
                  <h1>{res.title}</h1>
                </div>
              );
            })
          : null}
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
