
var url = require('url');
var express = require('express');
var router = express.Router();

var hash = require('./hash');
var db = require('./db');

/**
 * {
 *    url:
 *    created: 
 *    client:
 * }
 */

function register(req, res, qurl) { 
  try {
    /* Validate url */
    const myURL = new url.URL(qurl);

    db.registerURL(myURL.href, req.ip, (id, row) => {
      if (id) {
        /* Generate shortened url */
        var encoded = hash.encode(id);
        res.json({
          url: myURL.href,
          shorturl:`http://${req.get('host')}/${encoded}`,
          created: row.created,
        });    // TODO don't get server hostname from req
      } else {
        res.send('failed to register url');
      }
    });

  } catch (e) {
    if (e instanceof TypeError) {
      res.send('Invalid URL');
    } else {
      throw e;
    }
  }
}

router.post('/', function(req, res) {
  register(req, res, req.body.url);
}); 

module.exports = router;


