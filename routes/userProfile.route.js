//external import
const express = require("express");
const router = express.Router();

//internal import
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/checkLogin");
const profileController = require("../controllers/userProfile.controller");

router.get(
  "/u/:username",
  decorateHtmlResponse("Profile"),
  checkLogin,
  profileController
);

module.exports = router;
