const User = require("../database/models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "username" // maybe not necessary, DEFAULT
  },
  function(username, password, done) {
    User.findOne({ username: username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (!user.checkPassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      })
      .catch(err => console.log(err));
  }
);

module.exports = strategy;
