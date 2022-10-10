//external import
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { checkLogin } = require("../middlewares/checkLogin");
const User = require("../models/users.model");

//file upload folder
const upload_folder = `${__dirname}/../public/uploads/avatar`;

//define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload_folder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-")
        .split("_")
        .join("-")
        .split(".")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .png, .jpeg formate allowed"));
    }
  },
});

router.post(
  "/avatarupload",
  upload.single("avatar"),
  checkLogin,
  async (req, res) => {
    await User.updateOne(
      { _id: req.user.userId },
      {
        $set: {
          avatar: req.file.filename,
        },
      }
    );
    res.redirect("/u/" + req.user.username);
  }
);

module.exports = router;
