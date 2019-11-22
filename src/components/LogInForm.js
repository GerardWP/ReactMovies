import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function LogIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  let mainbg = require("../images/person-bg2.jpg");
  let bgStyle = {
    bg: {
      background: `url(${mainbg}) center top no-repeat #222`,
      backgroundSize: "cover"
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit - running");
    axios
      .post("/user/login", {
        username: username,
        password: password
      })
      .then(res => {
        if (res.status === 200) {
          // update App.js state
          props.updateUser({
            loggedIn: true,
            username: username
          });
          // update the state to redirect to home
          setRedirect(true);
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="LogInForm" style={bgStyle.bg}>
        <h2>Login</h2>
        <form>
          <div>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>
              <input
                className="form-input"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group ">
            <div className="col-7"></div>
            <button onClick={handleSubmit} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
