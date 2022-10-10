//internal import
const Student = require("../models/registration.model");
const User = require("../models/users.model");
const Program = require("../models/programs.model");

//get registration page
const getRegister = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const role = user.role;
  const getPrograms = await Program.find();
  res.render("registration", { role: role, programs: getPrograms });
};

//register a student
const registerStudent = async (req, res) => {
  const studentObject = {
    batch: req.body.batch,
    sId: req.body.sId,
    department: req.body.department,
    semester: req.body.semester,
    session: req.body.session,
    gender: req.body.gender,
    mobile: req.body.mobile,
    program: req.body.program,
    user: req.user.userId,
  };
  const newStudent = new Student(studentObject);
  try {
    const student = await newStudent.save();

    await User.updateOne(
      {
        _id: req.user.userId,
      },
      {
        $set: {
          //set register information when user registar
          student: student,
          //upadate role user to student when registar
          role: "student",
          batch: studentObject.batch,
          program: studentObject.program,
        },
      }
    );

    res.status(201).redirect("/u/" + req.user.username);
  } catch (err) {
    res.status(500).json({
      message: "Registration failed" + err,
    });
  }
};

module.exports = { getRegister, registerStudent };
