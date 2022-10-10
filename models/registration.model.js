const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  batch: {
    type: Number,
    required: true,
  },
  sId: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

//create model
module.exports = new mongoose.model("Student", studentSchema);
