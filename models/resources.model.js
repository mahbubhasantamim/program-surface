const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  sector: {
    type: String,
    required: true,
  },
});

//create model
module.exports = new mongoose.model("Resource", resourceSchema);
