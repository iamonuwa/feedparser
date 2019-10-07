const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let feedSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  published: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  link: {
    type: String,
    required: true
  },
  feed: {
    source: {
      type: String
    },
    link: {
      type: String
    },
    name: {
      type: String
    }
  }
});

module.exports = mongoose.model("Feeds", feedSchema);
