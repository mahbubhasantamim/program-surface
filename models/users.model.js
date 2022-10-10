const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  gender: {
    type: String,
  },
  batch: {
    type: Number,
  },
  program: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  designation: {
    type: String,
  },
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//create model
module.exports = new mongoose.model("User", usersSchema);
