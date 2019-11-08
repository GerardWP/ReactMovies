const express = require("express");
const router = express.Router();
const User = require("../database/models/user");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log("HERE IT IS");
  console.log(username, password);
  res.json(req.body); // work up until this point - res.json sends the right info, but nothing below here console.logs.
  // ADD VALIDATION
  User.findOne({ _username: username }, (err, user) => {
    console.log("HERE IT IS 2");
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      console.log("HERE IT IS 3");
      const newUser = new User({
        username: username,
        password: password
      });
      console.log("here..where it at");
      newUser.save((err, savedUser) => {
        console.log("here too...here it at");
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

module.exports = router;
