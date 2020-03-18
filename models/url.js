const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let URLSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  index: {
    type: Number
  }
});

let URL = mongoose.model("URL", URLSchema);

module.exports = URL;
