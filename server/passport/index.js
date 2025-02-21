const passport = require("passport");
const LocalStrategy = require("./local");
const User = require("../database/models/user");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log("*** serializeUser called, user: ");
  console.log(user); // raw user object
  console.log("---------");
  done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log("DeserializeUser called");
  User.findOne({ _id: id }, "username")
    .then(user => {
      console.log("*** Deserialize user, user:");
      console.log(user);
      console.log("--------------");
      done(null, user);
    })
    .catch(err => console.log(err));
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
