import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
let mainbg = require("../images/person-bg2.jpg");
let bgStyle = {
  bg: {
    background: `url(${mainbg}) center top no-repeat #222`,
    backgroundSize: "cover"
  }
};

function SignUp() {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [failedMsg, setFailedMsg] = useState("");

  const successRedirect = () => {
    setRedirect(true);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "username") {
      updateUsername(value.trim());
    } else {
      updatePassword(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Username:\n" + username);
    console.log("- - - - - - - - - - -");
    console.log("Password:\n" + password);

    axios
      .post("/user", {
        username: username,
        password: password
      })
      .then(res => {
        if (!res.data) {
          console.log("Error With Sign-Up");
        } else if (!res.data.username) {
          setFailedMsg(res.data.error);
          updatePassword("");
          updateUsername("");
          return;
        } else {
          console.log("Sign-Up Successful\n");
          console.log(res.data);
          successRedirect();
        }
      })
      .catch(error => {
        console.log("Server error\n" + error);
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="signUpForm" style={bgStyle.bg}>
        <h2>Sign-Up</h2>
        <span>{failedMsg}</span>
        <form id="myForm">
          <label>
            Username:
            <input
              type="text"
              value={username}
              name="username"
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      </div>
    );
  }
}

export default SignUp;
