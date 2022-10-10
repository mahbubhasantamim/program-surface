const jwt = require("jsonwebtoken");
//check login
const checkLogin = (req, res, next) => {
  let cookie = req.signedCookies[process.env.COOKIE_NAME]; //"authentication"
  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
      req.user = decoded;
      //pass user info to response locals
      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
      }
      next();
    } catch (err) {
      if (res.locals.html) {
        res.redirect("/login");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/login");
    } else {
      res.status(500).json({
        errors: {
          common: {
            msg: "Authentication failure!",
          },
        },
      });
    }
  }
};

//set loggedin user info in local
const loginInfo = (req, res, next) => {
  let cookie = req.signedCookies[process.env.COOKIE_NAME];
  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWT_SECRET);

      //pass user info to response locals
      res.locals.loggedInUser = decoded;

      next();
    } catch (err) {
      if (res.locals.html) {
        res.redirect("/login");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });
      }
    }
  } else {
    next();
  }
};
module.exports = { checkLogin, loginInfo };
