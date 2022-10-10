//external import
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

//internal import
require("./config/db");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const decorateHtmlResponse = require("./middlewares/common/decorateHtmlResponse");
const { loginInfo } = require("./middlewares/checkLogin");
const userRouter = require("./routes/users.route");
const userProfileRouter = require("./routes/userProfile.route");
const dashboardRouter = require("./routes/dashboard.route");
const registrationRouter = require("./routes/registration.route");
const avatarUploadRouter = require("./routes/avatarUpload.route");
const roadmapRouter = require("./routes/roadmap.route");

//set view engine
app.set("view engine", "ejs");

//handle form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//set static folder
app.use(express.static(__dirname + "/public"));

//router setup
app.get("/", decorateHtmlResponse("Home"), loginInfo, (req, res) => {
  res.render("index");
});
app.get("/about", decorateHtmlResponse("About Us"), loginInfo, (req, res) => {
  res.render("about");
});

app.use(userRouter);

// roadmap route
app.use(roadmapRouter);

// user profile route
app.use(userProfileRouter);

//dashboard route
app.use(dashboardRouter);

//student route
app.use(registrationRouter);

//avatar upload route
app.use(avatarUploadRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

module.exports = app;
