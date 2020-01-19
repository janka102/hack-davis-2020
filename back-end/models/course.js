const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  code: String,
  name: String
});

module.exports = mongoose.model("Course", Course);
