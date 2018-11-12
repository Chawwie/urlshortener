
var url = require('url');
var express = require('express');
var router = express.Router();

var hash = require('./hash');
var db = require('./db');

db.init();

function register(req, res, qurl) { 
  db.registerURL(qurl, req.ip, (id, row) => {
    if (id) {
      /* Generate shortened url */
      var encoded = hash.encode(id);
      res.json({
        url: row.url,
        shorturl:`http://${req.get('host')}/${encoded}`,
        created: row.created,
      });    // TODO don't get server hostname from req
    } else {
      res.status(400).json({error: 'invalid URL'});
    }
  });
}

router.post('/', function(req, res) {
  register(req, res, req.body.url);
}); 

module.exports = router;


