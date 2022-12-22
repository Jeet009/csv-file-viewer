var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  "Register Number": {
    type: Number,
  },
  "Personal Email": {
    type: String,
  },
  Mobile: {
    type: Number,
  },
});

module.exports = mongoose.model("studentModel", studentSchema);
