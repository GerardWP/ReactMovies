import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import SignUp from "../components/SignUp";
import LogIn from "../components/LogInForm";
import Home from "../components/Home";
import Nav from "../components/Nav";
// import Predictive from "../components/Predictive";
import API from "../utils/API";

// on selection will have to render and xtra API call for -
// person: get id, and search that persons movies, if actor, director - scripts, if writer...
// movie: movie search for cast to populate cast, and any other relevant calls - if bleongs to a collection..
// tv - all seasons, episodes even...

function Main() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLogin] = useState(false);
  const [results, setResults] = useState([]);
  const [resRender, setResRender] = useState([]);
  const [targetID, setTarget] = useState(null);

  const handler = value => {
    console.log("hndler on res cont clicks");
  };

  const clearRes = () => {
    setResRender([]);
  };

  //  Value from Search input
  const [query, setQuery] = useState("");

  const searchQuery = event => {
    const { name, value } = event.target;
    console.log(`name: ${name} \nvalue: ${value}`);
    setQuery(value);
    handleSubmit(value, event);
  };

  const handleSubmit = (query, event) => {
    event.preventDefault();
    if (query.length === 0) {
      return;
    } else
      API.getMulti(query)
        .then(res => {
          setResults(res.data.results);
        })
        .catch(err => {
          console.log(err);
        });
  };

  const resSelect = (type, id) => {
    console.log(type);
    console.log(id);
  };

  // checks for user on page load
  useEffect(() => getUser(), []);

  const updateUser = userObject => {
    console.log(userObject);
    setLogin(userObject.loggedIn);
    setUsername(userObject.username);
  };

  const getUser = () => {
    axios
      .get("/user/")
      .then(response => {
        console.log("Get user response: ");
        console.log(response.data);
        if (response.data.user) {
          console.log(
            "Get User: There is a user saved in the server session: "
          );
          setLogin(true);
          setUsername(response.data.user.username);
        } else {
          console.log("Get user: no user");
          setLogin(false);
          setUsername(null);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <Router>
        <Nav
          updateUser={updateUser}
          loggedIn={loggedIn}
          username={username}
          clearRes={clearRes}
        />
        {loggedIn ? (
          <form className={loggedIn ? "searchBar searchLogged" : "searchBar"}>
            <input
              type="search"
              id="site-search"
              value={query} // need this to make sure state goes to input
              name="searchBar"
              placeholder="Search"
              onChange={searchQuery} // input goes to state
              onKeyDown={e =>
                e.key === "Enter"
                  ? (setTarget(""), setResRender(results))
                  : null
              }
            />
          </form>
        ) : null}
        {results && query !== "" ? (
          <ul id="predictive">
            {results.map(res => {
              return (
                <li
                  key={res.id}
                  tabIndex="0"
                  onClick={event => {
                    setQuery("");
                    resSelect(res.media_type, res.id);
                  }}
                  onKeyDown={e =>
                    e.key === "Enter"
                      ? (setQuery(""), resSelect(res.media_type, res.id))
                      : null
                  }
                >
                  {res.media_type === "movie" ? (
                    <>
                      <h4>{res.title}</h4>
                      <h6>{res.release_date}</h6>
                    </>
                  ) : res.media_type === "tv" ? (
                    <>
                      <h4>{res.name}</h4>
                      <h6>{res.first_air_date}</h6>
                    </>
                  ) : (
                    <>
                      <h4>{res.name}</h4>
                      <h6>{res.known_for_department}</h6>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <span></span>
        )}
        <Switch>
          <Route exact path="/">
            <Home
              loggedIn={loggedIn}
              targetID={targetID}
              handler={handler}
              resRender={resRender}
            />
          </Route>
          <Route
            path="/login"
            render={props => <LogIn {...props} updateUser={updateUser} />}
          />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default Main;
