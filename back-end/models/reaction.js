const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reaction = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  lecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
  time: Number,
  source: {
    type: String,
    enum: ["video", "button"]
  },
  result: Object
});

module.exports = mongoose.model("Reaction", Reaction);
