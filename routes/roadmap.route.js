const express = require("express");
const router = express.Router();

//internal import
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { loginInfo } = require("../middlewares/checkLogin");

// Get all roadmaps
router.get(
  "/roadmaps",
  decorateHtmlResponse("Roadmaps"),
  loginInfo,
  (req, res) => {
    res.render("roadmaps");
  }
);
// Machine learning route
router.get(
  "/machinelearning",
  decorateHtmlResponse("Machine Learning"),
  loginInfo,
  (req, res) => {
    res.render("mlRoadmap");
  }
);

//web development route
router.get(
  "/webdevelopment",
  decorateHtmlResponse("Web Development"),
  loginInfo,
  (req, res) => {
    res.render("webRoadmap");
  }
);
module.exports = router;
