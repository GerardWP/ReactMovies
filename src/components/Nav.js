import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import "../App.css";

function Nav(props) {
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
    <>
      <SearchBar loggedIn={loggedIn} />
      <header className="appHeader" id="nav-container">
        <h1>MoviesDb</h1>
        <section>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="menuBtn">Home</span>
          </Link>
          {loggedIn ? (
            <Link to="/" style={{ textDecoration: "none" }} onClick={logOut}>
              <span className="menuBtn">Logout</span>
            </Link>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span className="menuBtn">Login</span>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <span className="menuBtn">Sign-Up</span>
              </Link>
            </>
          )}
        </section>
      </header>
    </>
  );
}

export default Nav;
