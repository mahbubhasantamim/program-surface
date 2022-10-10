//external import
const express = require("express");
const router = express.Router();

//internal import
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin, loginInfo } = require("../middlewares/checkLogin");
const {
  getRegister,
  registerStudent,
} = require("../controllers/registration.controller");

router.get(
  "/registration",
  decorateHtmlResponse("Registration"),
  checkLogin,
  getRegister
);
router.post(
  "/registration",
  decorateHtmlResponse(),
  checkLogin,
  registerStudent
);

module.exports = router;
