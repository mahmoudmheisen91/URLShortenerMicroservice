const mongoose = require("mongoose");
const shortID = require("shortid");

let Schema = mongoose.Schema;
let URLSchema = new Schema({
  url_link: {
    type: String,
    required: true,
    unique: true
  },
  index: {
    type: String,
    default: shortID.generate
  }
});

let URL = mongoose.model("URL", URLSchema);

module.exports = URL;
