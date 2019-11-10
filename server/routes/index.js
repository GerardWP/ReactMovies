const router = require("express").Router();
// const User = require("../database/models/user");
// const passport = require("../passport");
const userRoutes = require("./user");

router.use("/user", userRoutes);

module.exports = router;
