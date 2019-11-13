import axios from "axios";
const key = process.env.REACT_APP_API_KEY;
console.log(key);

export default {
  // Gets all books
  getMovie: function(query) {
    console.log("getMovie function, running...");
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`
    );
  }
};

// ,
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
