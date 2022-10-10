const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

//Singup handler
const createUser = async (req, res) => {
  //rename username
  let username = req.body.username;
  const usernameRename = username
    .toLowerCase()
    .split(" ")
    .join("")
    .split("_")
    .join("");
  try {
    const vUserEmail = await User.findOne({
      email: req.body.email,
    });
    const vUserUsername = await User.findOne({
      username: usernameRename,
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (vUserUsername) {
      res
        .status(401)
        .json({ message: `Username ${usernameRename} already used` });
    } else if (vUserEmail) {
      res.status(401).json({ message: "Email already used" });
    } else {
      const newUser = new User({
        name: req.body.name,
        username: usernameRename,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).redirect("/login");
    }
  } catch (err) {
    res.status(500).json({
      message: "Signup failed",
    });
  }
};

//login handler
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        const userObject = {
          userId: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
          role: user.role,
        };
        const token = jwt.sign(userObject, process.env.JWT_SECRET);

        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          signed: true,
          httpOnly: true,
        });
        //set logged in user local identifier
        res.locals.loggedInUser = userObject;
        res.redirect("/");
      } else {
        res.status(401).json({
          error: "Incorrect password",
        });
      }
    } else {
      res.status(401).json({
        error: "User not found",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Server side error" + err,
    });
  }
};

//logout handler
const logoutUser = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.render("index");
};
module.exports = { createUser, loginUser, logoutUser };
