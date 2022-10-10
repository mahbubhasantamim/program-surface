const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
  program: {
    type: String,
    required: true,
  },
  notice: {
    type: String,
    required: true,
  },
});

//create model
module.exports = new mongoose.model("Notice", noticeSchema);
