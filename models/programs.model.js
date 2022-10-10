const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
  programname: {
    type: String,
    required: true,
  },
  programrole: {
    type: String,
    required: true,
  },
});

//create model
module.exports = new mongoose.model("Program", programSchema);
