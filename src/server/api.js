
var url = require('url');
var express = require('express');
var router = express.Router();

var hash = require('./hash');
var db = require('./db');

db.init();

const URL_REGEX = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

function register(req, res, qurl) { 
  if (URL_REGEX.test(qurl)) {
    if (!qurl.match(/^[a-zA-Z]+:\/\//)) {
        qurl = 'http://' + qurl;
    }
    db.registerURL(qurl, req.ip, (id, row) => {
      if (id) {
        /* Generate shortened url */
        var encoded = hash.encode(id);
        res.json({
          url: qurl,
          shorturl:`http://${req.get('host')}/${encoded}`,
          created: row.created,
        });    // TODO don't get server hostname from req
      } else {
        res.status(400).json({error: 'failed to register url'});
      }
    });
  } else {
    res.status(400).json({error: 'invalid URL'});
  }
}

router.post('/', function(req, res) {
  register(req, res, req.body.url);
}); 

module.exports = router;


