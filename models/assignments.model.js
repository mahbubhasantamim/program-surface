const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  batch: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  assignment: {
    type: String,
    required: true,
  },
});

//create model
module.exports = new mongoose.model("Assignment", assignmentSchema);
