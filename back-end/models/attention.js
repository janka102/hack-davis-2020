const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Attention = new Schema({
  lecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  time: Number,
  result: Object
});

module.exports = mongoose.model("Attention", Attention);
