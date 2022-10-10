const User = require("../models/users.model");
const createError = require("http-errors");
const Resource = require("../models/resources.model");
const Assignment = require("../models/assignments.model");
const Notice = require("../models/notice.model");

const profile = async (req, res) => {
  try {
    if (req.params.username === req.user.username) {
      //find user
      const info = await User.findOne({
        username: req.params.username,
      }).populate("student");

      //get user batchmate
      const batchmates = await User.find({
        batch: info.batch,
        program: `${info.program}`,
      }).populate("student");

      // get resources
      const resources = await Resource.find({
        //find by user program
        sector: `${info.program}`,
      });

      // get assignments
      const assignments = await Assignment.find({
        //find by user batch & program
        batch: info.batch,
        program: `${info.program}`,
      })
        .sort({ $natural: -1 })
        .limit(5);

      //find students notice
      const studentsNotices = await Notice.findOne({
        program: "all-students",
      }).sort({
        $natural: -1,
      });

      //find students notice
      const notices = await Notice.findOne({
        program: `${info.program}`,
      }).sort({
        $natural: -1,
      });

      res.render("profile", {
        studentData: info,
        batchmates: batchmates,
        resources: resources,
        assignments: assignments,
        studentsNotices: studentsNotices,
        notices: notices,
      });
    } else {
      throw createError("Your requested content was not found!");
    }
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};

module.exports = profile;
