const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Lecture = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  name: String,
  date: String,
  video: String
});

module.exports = mongoose.model("Lecture", Lecture);
