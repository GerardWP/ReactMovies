const express = require("express");
const app = express();
const routes = require("./routes/index");
const session = require("express-session");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Sessions
app.use(
  session({
    secret: "bonox-chicken",
    resave: false,
    saveUninitialized: false
  })
);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
