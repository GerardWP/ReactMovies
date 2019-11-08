const express = require("express");
const app = express();
const routes = require("./routes/index");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

app.use(routes);
// Code for heroku
// Code for mongoose
// code for passport

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
