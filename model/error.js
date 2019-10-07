const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let errorSchema = new Schema({
  link: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Error", errorSchema);
