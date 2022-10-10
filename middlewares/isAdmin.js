const User = require("../models/users.model");

//instructor access
const isInstructor = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });
  const coFounderRole = "co-founder";
  const adminRole = "admin";
  const instructorRole = "instructor";

  if (
    // req.user.role === coFounderRole ||
    // req.user.role === adminRole ||
    // req.user.role === instructorRole

    user.role === coFounderRole ||
    user.role === adminRole ||
    user.role === instructorRole
  ) {
    next();
  } else {
    res.redirect("back");
  }
};

//co-founder access
const isAdmin = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });

  const coFounderRole = "co-founder";
  const adminRole = "admin";

  if (
    // req.user.role === coFounderRole ||
    //  req.user.role === adminRole
    user.role === coFounderRole ||
    user.role === adminRole
  ) {
    next();
  } else {
    res.redirect("back");
  }
};

module.exports = { isInstructor, isAdmin };
