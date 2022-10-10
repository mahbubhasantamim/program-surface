const User = require("../models/users.model");
const Student = require("../models/registration.model");
const Resource = require("../models/resources.model");
const Program = require("../models/programs.model");
const Assignment = require("../models/assignments.model");
const Notice = require("../models/notice.model");
const { unlink } = require("fs");
const path = require("path");
const createError = require("http-errors");

//dashboard
const dashboard = async (req, res) => {
  try {
    //pass admin information
    const admin = await User.findOne({ _id: req.user.userId });

    //find all users
    const users = await User.find().populate("student");

    //find all students
    const students = await User.find({ role: "student" }).populate("student");

    //find all instructors
    const instructors = await User.find({ role: "instructor" });

    //find all notices
    const notices = await Notice.find().sort({ $natural: -1 });

    //find all programs
    const programs = await Program.find();

    res.render("dashboard", {
      admin: admin,
      users: users,
      students: students,
      instructors: instructors,
      notices: notices,
      programs: programs,
    });
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};

//remove user
const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.uid });

    if (user.student) {
      await Student.deleteOne({ _id: user.student });
    }

    //remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatar/${user.avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    res.status(200).json({
      message: "User was remove successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete user",
        },
      },
    });
  }
};

//add instructor
const addInstructor = async (req, res) => {
  instructorObject = {
    email: req.body.email,
    mobile: req.body.mobile,
    designation: req.body.designation,
  };
  try {
    const user = await User.findOne({ email: instructorObject.email });

    if (user) {
      await User.updateOne(
        {
          email: instructorObject.email,
        },
        {
          $set: {
            role: "instructor",
            designation: instructorObject.designation,
            mobile: instructorObject.mobile,
          },
        }
      );
      res.redirect("back");
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Instructor add failed",
    });
  }
};

//remove instructor
const removeInstructor = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.uid });

    if (user.role === "instructor") {
      if (user.student) {
        await User.updateOne(
          {
            email: user.email,
          },
          {
            $set: {
              role: "student",
            },
            $unset: {
              designation: "",
              mobile: "",
            },
          }
        );
      } else {
        await User.updateOne(
          {
            email: user.email,
          },
          {
            $set: {
              role: "user",
            },
            $unset: {
              designation: "",
              mobile: "",
            },
          }
        );
      }
    }

    res.status(200).json({
      message: "User was remove successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not remove instructor",
        },
      },
    });
  }
};

//add resources
const addResource = async (req, res) => {
  resourceObject = {
    title: req.body.title,
    link: req.body.link,
    type: req.body.type,
    sector: req.body.sector,
    desc: req.body.desc,
  };
  try {
    const newResource = new Resource(resourceObject);
    await newResource.save();
    res.status(201).redirect("back");
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Server side error!" + err,
        },
      },
    });
  }
};

//get resouces
const getResources = async (req, res) => {
  //get all resources
  const resources = await Resource.find();

  res.render("resources", { resources: resources });
};

//add assignments
const addAssignment = async (req, res) => {
  const assignmentObject = {
    batch: req.body.batch,
    program: req.body.program,
    date: req.body.date,
    assignment: req.body.assignment,
  };
  try {
    const newAssignment = new Assignment(assignmentObject);
    await newAssignment.save();
    res.status(201).redirect("back");
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Server side error!" + err,
        },
      },
    });
  }
};

//add notice
const addNotice = async (req, res) => {
  const noticeObject = {
    program: req.body.program,
    notice: req.body.notice,
  };

  try {
    const newNotice = new Notice(noticeObject);
    await newNotice.save();
    res.status(201).redirect("back");
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Server side error!" + err,
        },
      },
    });
  }
};

//add program
const addProgram = async (req, res) => {
  const programObject = {
    programname: req.body.programname,
    programrole: req.body.programrole,
  };

  try {
    const newProgram = new Program(programObject);
    await newProgram.save();
    res.status(201).redirect("back");
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Server side error!" + err,
        },
      },
    });
  }
};
module.exports = {
  dashboard,
  removeUser,
  addInstructor,
  removeInstructor,
  addResource,
  getResources,
  addAssignment,
  addNotice,
  addProgram,
};
