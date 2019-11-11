import React from "react";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Nav(props) {
  console.log("Nav props:");
  console.log(props);
  const loggedIn = props.loggedIn;

  const logOut = event => {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(res => {
        if (res.status === 200) {
          props.updateUser({
            loggedIn: false,
            username: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error\n" + error);
      });
  };

  return (
    <div>
      <header className="navbar App-header" id="nav-container">
        <div className="col-4">
          {loggedIn ? (
            <section className="navbar-section">
              <Link
                to="#"
                className="btn btn-link text-secondary"
                onClick={logOut}
              >
                <span className="text-secondary">logout</span>
              </Link>
              <p>Welcome, {props.username}!</p>
            </section>
          ) : (
            <section className="navbar-section">
              <Link to="/" className="btn btn-link text-secondary">
                <span className="text-secondary">home</span>
              </Link>
              <Link to="/login" className="btn btn-link text-secondary">
                <span className="text-secondary">login</span>
              </Link>
              <Link to="/signup" className="btn btn-link">
                <span className="text-secondary">sign up</span>
              </Link>
            </section>
          )}
        </div>
        <div className="col-4 col-mr-auto">
          <div id="top-filler"></div>
          <h1>MoviesDbGP</h1>
        </div>
      </header>
    </div>
  );
}

export default Nav;
