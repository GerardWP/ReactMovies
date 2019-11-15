import React from "react";

function Home(props) {
  console.log("home props");
  console.log(props);
  if (props.loggedIn) {
    console.log("yeeeeeehaw");
    return (
      <div className="homePge">
        <h1>Welcome, {props.username}</h1>
        {props.selection.length > 0
          ? props.selection.map(res => {
              console.log(res);
              return (
                <div key={res.id}>
                  <h1>{res.media_type === "movie" ? res.title : res.name}</h1>
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
