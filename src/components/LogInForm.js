import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function LogIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

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
        console.log("login response: ");
        console.log(res);
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
      <div>
        <h4>Login</h4>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="username">
                Username
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="password">
                Password:{" "}
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group ">
            <div className="col-7"></div>
            <button
              className="btn btn-primary col-1 col-mr-auto"
              onClick={handleSubmit}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
