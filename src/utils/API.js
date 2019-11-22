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
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US&append_to_response=videos,images,similar,credits,recommendations,combined_credits`
    );
  },
  findGenre: (id, page, type) => {
    console.log("findGenre function, running...");
    return axios.get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${key}&page=${page}?language=en-US&include_adult=false&with_genres=${id}`
    );
  },
  getCollection: id => {
    console.log("getCollection function, running...");
    return axios.get(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${key}&language=en-US`
    );
  }
};
