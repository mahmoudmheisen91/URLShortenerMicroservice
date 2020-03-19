const URLink = require("../models/url");
const dns = require("dns");

let express = require("express");
let router = express.Router();

// Greeting endpoint...
// GET Greeting: GET /api/shorturl/hello
router.get("/hello", (req, res) => {
  res.json({ greetings: "Hello, API" });
});

// Check url:
let check_url = (req, res, callback) => {
  let url = req.body.url_link;
  let url_obj = new URL(url);

  if (url_obj.protocol != "http:") {
    if (url_obj.protocol != "https:") {
      res.json({ error: "Invalid URL", URL: req.body.url_link });
      return;
    }
  }

  dns.lookup(url_obj.host, err => {
    if (err) {
      res.json({ error: "Invalid URL", URL: req.body.url_link });
      return;
    }

    if (url.match(/\/$/i)) url = url.slice(0, -1);
    callback(url);
  });
};

// Create URL endpoint...
// POST Create URL: POST /api/shorturl/new
router.post("/new", (req, res, next) => {
  check_url(req, res, url => {
    let new_url = new URLink({
      url_link: url
    });

    URLink.findOne({ url_link: url }, (err, urlData) => {
      if (err) return next(err);

      // IF url exists, show it:
      if (urlData) {
        res.json({
          original_url: urlData.url_link,
          short_url: urlData.short_url
        });
        return;
      }
      // else save it:
      new_url.save((err, newUrlData) => {
        if (err) return next(err);
        res.json({
          original_url: newUrlData.url_link,
          short_url: newUrlData.short_url
        });
      });
    });
  });
});

// GET All URL endpoint...
// GET /api/shorturl/urls
router.get("/urls", (req, res, next) => {
  URLink.find({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

// GET Clear All URL endpoint...
// GET /api/shorturl/clear
router.get("/clear", (req, res, next) => {
  URLink.remove({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

// GET Short URL endpoint...
// GET /api/shorturl/[&amp;index]
router.get("/:short_url", (req, res, next) => {
  let short_url = req.params.short_url;

  URLink.findOne({ short_url: short_url }, function(err, urlData) {
    if (err) return next(err);
    if (urlData) {
      res.redirect(urlData.url_link);
    } else {
      res.json({ error: "Short URL Not Found" });
    }
  });
});

module.exports = router;
