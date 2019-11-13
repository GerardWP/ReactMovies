const router = require("express").Router();
const User = require("../../database/models/user");
const passport = require("../../passport");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log("Saving User:\n");
  console.log(username, password);
  User.findOne({ username: username })
    .then(user => {
      if (user) {
        res.json({
          error: `Sorry, already a user with the username: ${username}`
        });
      } else {
        const newUser = new User({
          username: username,
          password: password
        });
        newUser
          .save()
          .then(savedUser => {
            console.log("User Saved:" + savedUser);
            res.json(savedUser);
          })
          .catch(err => {
            res.json(err);
          });
      }
    })
    .catch(err => console.log(err));
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("logged in\n", req.user);
  var userInfo = {
    username: req.user.username
  };
  res.send(userInfo);
});

router.get("/", (req, res) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
