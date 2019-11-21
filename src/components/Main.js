import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import SignUp from "../components/SignUp";
import LogIn from "../components/LogInForm";
import Home from "../components/Home";
import Nav from "../components/Nav";
// Utilities
import API from "../utils/API";
// Data
import genres from "../components/GenreLists";

// on selection will have to render and xtra API call for -
// person: get id, and search that persons movies, if actor, director - scripts, if writer...
// movie: movie search for cast to populate cast, and any other relevant calls - if bleongs to a collection..
// tv - all seasons, episodes even...

function Main() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLogin] = useState(false);
  const [results, setResults] = useState([]);
  const [resRender, setResRender] = useState({ type: "generic", results: [] });
  const [placeholder, setPlaceholder] = useState("Search");

  const handler = (type, id) => {
    findSelect(type, id);
  };

  const clearRes = () => {
    setResRender({ type: "generic", results: [] });
  };

  //  Value from Search input
  const [query, setQuery] = useState("");

  const searchQuery = event => {
    const { name, value } = event.target;
    console.log(`name: ${name} \nvalue: ${value}`);
    setQuery(value);
    // should i put handleSubmit into a setTimeout to prevent the api from being overloaded?
    handleSubmit(value, event);
  };

  const findGenre = (id, page, type) => {
    API.findGenre(id, page, type)
      .then(res => {
        if (res.data.results.length > 0) {
          let genreArr = res.data.results.map(res => ({
            ...res,
            media_type: type
          }));
          setResRender({ type: "generic", results: genreArr });
        } else {
          setQuery("");
          setPlaceholder("Sorry, No results Found");
          setTimeout(() => setPlaceholder("Search"), 2000);
        }
      })
      .catch(err => console.log(err));
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

  const findSelect = (type, id) => {
    API.findChoice(id, type)
      .then(res => {
        console.log("it worked - type");
        console.log(res.data.type);
        setResRender({ type: "target", results: [res.data] });
      })
      .catch(err => console.log(err));
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
              placeholder={placeholder}
              onChange={searchQuery} // input goes to state
              onKeyDown={e =>
                e.key === "Enter"
                  ? (e.preventDefault(),
                    setQuery(""),
                    setResRender({ type: "generic", results: results }))
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
                    findSelect(res.media_type, res.id);
                  }}
                  onKeyDown={e =>
                    e.key === "Enter"
                      ? (setQuery(""), findSelect(res.media_type, res.id))
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
              handler={handler}
              findGenre={findGenre}
              resRender={resRender}
              user={username}
              genres={genres}
            />
          </Route>
          <Route
            path="/login"
            render={props => <LogIn {...props} updateUser={updateUser} />}
          />
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Main;
