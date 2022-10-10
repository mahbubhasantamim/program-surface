//external import
const express = require("express");
const router = express.Router();

//internal import
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/checkLogin");
const {
  dashboard,
  removeUser,
  addInstructor,
  removeInstructor,
  addResource,
  getResources,
  addAssignment,
  addNotice,
  addProgram,
} = require("../controllers/dashboard.controller");

const { isAdmin, isInstructor } = require("../middlewares/isAdmin");

//get dashboard
router.get(
  "/dashboard",
  decorateHtmlResponse("Dashboard"),
  checkLogin,
  isInstructor,
  dashboard
);

//delete user
router.delete("/deleteuser/:uid", checkLogin, isAdmin, removeUser);

//add instructor
router.post("/addinstructor", checkLogin, isAdmin, addInstructor);

//remove instructor
router.put("/removeInstructor/:uid", checkLogin, isAdmin, removeInstructor);

//add resources
router.post("/addresource", checkLogin, isInstructor, addResource);

//get resources
router.get(
  "/resources",
  decorateHtmlResponse("Resources"),
  checkLogin,
  getResources
);

//add assignment
router.post("/addassignment", checkLogin, isInstructor, addAssignment);

//add program
router.post("/addprogram", checkLogin, isAdmin, addProgram);

//add program
router.post("/addnotice", checkLogin, isAdmin, addNotice);

module.exports = router;
