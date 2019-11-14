import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import SignUp from "../components/SignUp";
import LogIn from "../components/LogInForm";
import Home from "../components/Home";
import Nav from "../components/Nav";
import Predictive from "../components/Predictive";
import API from "../utils/API";

function Main() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLogin] = useState(false);
  const [activeSearch, setActive] = useState("movie");
  const [results, setResults] = useState([]);
  const [canRender, setRender] = useState(false);

  //  Value from Search input
  const [query, setQuery] = useState("");

  const searchQuery = event => {
    const { name, value } = event.target;
    console.log(`name: ${name} \nvalue: ${value}`);
    setQuery(value);
    handleSubmit(value, event, activeSearch);
  };

  const category = event => {
    const value = event.target.getAttribute("data");
    setQuery("");
    setActive(value);
  };

  const handleSubmit = (query, event, param) => {
    event.preventDefault();
    console.log("handleSubmit...");
    console.log(query);
    API.getGeneric(query, param)
      .then(res => {
        console.log(".then - response");
        setResults(res.data.results);
        console.log(results);
      })
      .catch(err => {
        console.log(".catch - error");
        console.log(err);
      });
  };

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
            <div className="searchCategory">
              <span
                className={
                  activeSearch === "movie" ? "searchCat active" : "searchCat"
                }
                data="movie"
                onClick={category}
              >
                Movie
              </span>
              <span
                className={
                  activeSearch === "person" ? "searchCat active" : "searchCat"
                }
                data="person"
                onClick={category}
              >
                Person
              </span>
              <span
                className={
                  activeSearch === "tv" ? "searchCat active" : "searchCat"
                }
                data="tv"
                onClick={category}
              >
                TV
              </span>
            </div>
            <button
              onClick={event => {
                setRender(true);
                setQuery("");
                handleSubmit(query, event, activeSearch);
              }}
            >
              Search
            </button>
          </form>
        ) : null}
        <Predictive res={results} query={query} />
        <Switch>
          <Route exact path="/">
            <Home
              loggedIn={loggedIn}
              username={username}
              results={results}
              canRender={canRender}
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
