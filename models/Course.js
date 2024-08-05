const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  code: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema);
