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

  URL.findOne({ url_link: new_url.url_link }, (err, urlData) => {
    if (err) return next(err);

    // IF url exists, show it:
    if (urlData) {
      res.json({
        original_url: urlData.url_link,
        short_url: urlData.index
      });
    } else {
      // else save it:
      new_url.save((err, newUrlData) => {
        if (err) return next(err);
        res.json({
          original_url: newUrlData.url_link,
          short_url: newUrlData.index
        });
      });
    }
  });
});

// GET All URL endpoint...
// GET /api/shorturl/urls
router.get("/urls", (req, res, next) => {
  URL.find({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
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
