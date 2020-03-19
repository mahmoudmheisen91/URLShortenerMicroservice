const mongoose = require("mongoose");
const shortID = require("shortid");

let Schema = mongoose.Schema;
let URLSchema = new Schema({
  url_link: {
    type: String,
    required: true,
    unique: true
  },
  short_url: {
    type: String,
    default: shortID.generate
  }
});

let URLink = mongoose.model("URLink", URLSchema);

module.exports = URLink;
