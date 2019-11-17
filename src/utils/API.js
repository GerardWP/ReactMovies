import axios from "axios";
const key = process.env.REACT_APP_API_KEY;

export default {
  // api call for movie, person or tv
  getMulti: query => {
    console.log("getMulti function, running...");
    return axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${query}&include_adult=false`
    );
  },
  findChoice: (id, type) => {
    console.log("findChoice function, running...");
    return axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US&append_to_response=videos,images,similar,credits,recommendations`
    );
  }
};

// add this to the end of query to stop adult rated stuff getting through.
// &include_adult=false
// `https://api.themoviedb.org/3/search/${param}?api_key=${key}&language=en-US&query=${query}&page=1`

// https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images
