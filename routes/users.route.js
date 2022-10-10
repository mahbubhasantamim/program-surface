//external import
const express = require("express");
const router = express.Router();

//internal import
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/users.controller");
const { loginInfo } = require("../middlewares/checkLogin");

// user routers

//user signup
router.get("/signup", decorateHtmlResponse("Signup"), (req, res) => {
  res.render("signup");
});
router.post("/signup", loginInfo, createUser);

//user login
router.post("/login", decorateHtmlResponse("Login"), loginUser);
router.get("/login", decorateHtmlResponse("Login"), (req, res) => {
  res.render("login");
});

router.delete("/", logoutUser);

module.exports = router;
