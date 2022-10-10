const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

//internal import
const User = require("../../models/users.model");

const signupValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .isAlpha("en-US")
    .withMessage("Userame must not contain anything other than alphabet")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ username: value });
        if (user) {
          throw createError("username already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

const signupValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};
module.exports = { signupValidator, signupValidationHandler };
