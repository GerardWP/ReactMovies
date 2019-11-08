const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("user signup");
  if (req.body) {
    console.log("i think it worked!");
    console.log(req.body);
  } else console.log("it didnt work");
});

module.exports = router;
