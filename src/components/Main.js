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

function Main() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLogin] = useState(false);
  const [results, setResults] = useState([]);
  // const [canRender, setRender] = useState(false);
  const [selection, setSelect] = useState([]);
  // variable use to limit results shown in predictive text
  // let mapResults = [];

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
    console.log("handleSubmit...");
    console.log(query);
    if (query.length === 0) {
      return;
    } else
      API.getMulti(query)
        .then(res => {
          console.log(".then - response");
          setResults(res.data.results);
        })
        .catch(err => {
          console.log(".catch - error");
          console.log(err);
        });
  };

  const handleChoice = res => {
    console.log([res]);
    console.log("hanlding choice");
    setSelect([res]);
    console.log(selection);
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

  // need to set up clickfunction to render for Results instead of search button - remove search button

  return (
    <div className="App">
      <Router>
        <Nav updateUser={updateUser} loggedIn={loggedIn} username={username} />
        {loggedIn ? (
          <form className={loggedIn ? "searchBar searchLogged" : "searchBar"}>
            <input
              type="search"
              id="site-search"
              value={query} // need this to make sure state goes to input
              name="searchBar"
              placeholder="Search"
              onChange={searchQuery} // input goes to state
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
                    handleChoice({ ...res });
                  }}
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
              username={username}
              selection={selection}
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
