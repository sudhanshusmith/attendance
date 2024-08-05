const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  date: { type: String, required: true },
  mark: { type: String, required: true, enum: ["P", "A"] },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
