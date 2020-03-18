const URL = require("../models/url");

let express = require("express");
let router = express.Router();

// Greeting endpoint...
// GET Greeting: GET /api/shorturl/hello
router.get("/hello", (req, res) => {
  res.json({ greetings: "Hello, API" });
});

// Create URL endpoint...
// POST Create URL: POST /api/shorturl/new
router.post("/new", (req, res, next) => {
  let new_url = new URL(req.body);

  new_url.save((err, urlData) => {
    if (err) return next(err);
    res.json({
      original_url: urlData.url_link,
      short_url: urlData.index
    });
  });
});

// GET Short URL endpoint...
// GET /api/shorturl/[&amp;index]
router.get("/:short_url", (req, res, next) => {
  let short_url = req.params.short_url;

  URL.findOne({ index: short_url }, function(err, urlData) {
    if (err) return next(err);
    if (urlData) {
      res.redirect(urlData.url_link);
    } else {
      res.json({ error: "Short URL Not Found" });
    }
  });
});

module.exports = router;
