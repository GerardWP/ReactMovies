import React from "react";
import "../App.css";

function SearchBar(props) {
  //   const loggedIn = props.loggedin;
  return (
    <form className={props.loggedIn ? "searchBar searchLogged" : "searchBar"}>
      <input type="search" id="site-search" name="q" placeholder="Search" />
      <button>Search</button>
    </form>
  );
}
export default SearchBar;
