import React, { useState } from "react";
import "../App.css";
import API from "../utils/API";

function SearchBar(props) {
  const [query, setQuery] = useState("");

  const searchQuery = event => {
    const { name, value } = event.target;
    console.log(`name: ${name} \nvalue: ${value}`);
    setQuery(value.trim());
  };

  const handleSubmit = (query, event) => {
    event.preventDefault();
    console.log("handleSubmit...");
    console.log(query);
    API.getMovie(query)
      .then(res => {
        console.log(".then - response");
        console.log(res.data);
      })
      .catch(err => {
        console.log(".catch - error");
        console.log(err);
      });
  };

  return (
    <form className={props.loggedIn ? "searchBar searchLogged" : "searchBar"}>
      <input
        type="search"
        id="site-search"
        name="searchBar"
        placeholder="Search"
        onChange={searchQuery}
      />
      <button onClick={event => handleSubmit(query, event)}>Search</button>
    </form>
  );
}
export default SearchBar;
