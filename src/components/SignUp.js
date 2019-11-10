import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "username") {
      updateUsername(value);
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
        if (res.data) {
          console.log("Sign-Up Successful\n");
          console.log(res.data);
          //   redirectTo("/login");
        } else {
          console.log("Error With Sign-Up");
        }
      })
      .catch(error => console.log("Server error\n" + error));
  };

  return (
    <div>
      <form>
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

export default SignUp;
