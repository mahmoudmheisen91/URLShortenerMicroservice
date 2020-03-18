const URL = require("../models/url");

let express = require("express");
let router = express.Router();

// Greeting endpoint...
// GET Greeting: GET /api/exercise/hello
router.get("/hello", (req, res) => {
  res.json({ greetings: "Hello, API" });
});

module.exports = router;
