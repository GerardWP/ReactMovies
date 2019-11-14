import axios from "axios";
const key = process.env.REACT_APP_API_KEY;

export default {
  // api call for movie or person
  getGeneric: (query, param) => {
    console.log("getMovie function, running...");
    return axios.get(
      `https://api.themoviedb.org/3/search/${param}?api_key=${key}&language=en-US&query=${query}&page=1`
    );
  }
};

// add this to the end of query to stop adult rated stuff getting through.
// &include_adult=false
