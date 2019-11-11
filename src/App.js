import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// Components
import SignUp from "./components/SignUp";
import LogIn from "./components/LogInForm";
import Home from "./components/Home";
import Nav from "./components/Nav";

function App() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => getUser(), []);

  const updateUser = userObject => {
    console.log(userObject);
    // console.log(userObject.loggedIn);
    // console.log(userObject.username);
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
        <Nav updateUser={updateUser} loggedIn={loggedIn} />
        {/* {username ? <h1>username</h1> : <h2>no usrname</h2>} */}
        <Switch>
          <Route exact path="/" component={Home} />
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

export default App;

// {/* greet user if logged in: */}
// {loggedIn ? (
//   <p>Join the party, {username}!</p>
// ) : (
//   <p>Log in if you want</p>
// )}
// {/* Routes to different components */}
