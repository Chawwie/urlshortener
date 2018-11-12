
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/test.db');

function dbinit() {
  var db = new sqlite3.Database('./db/test.db');
  db.serialize(function() {
    db.run('CREATE TABLE urls (url TEXT)');
    var stmt = db.prepare('INSERT INTO urls VALUES (?)');
    stmt.run('https://www.google.com');
    stmt.run('https://reddit.com');
    stmt.run('https://youtube.com');
    stmt.finalize();
  });
  db.close();
}


function getURL(rowid, next) {
  db.get('SELECT url FROM urls WHERE rowid=?', rowid, function(err, row) {
    if (err) {
      next('db error');  // TODO throw errors instead
    } else if (typeof row === 'undefined') {
      next('url not found'); // TODO throw errors instead
    } else {
      next(row.url);
    }
  });
}

function urlExists(url, next) {
  db.get('SELECT rowid FROM urls where url=?', url, function(err, row) {
    if (typeof next === "function") {
      if (err) {
        next('db error');
      } else if (typeof row === 'undefined') {
        next(false);
      } else {
        next(true);
      }
    }
  });
}

function registerURL(url, client, next) {
  row = {
    $url: url,
    $created: Date.now(),
    $ttl: 86400,
    $client: client
  }

  db.run('INSERT INTO urls (url,created,ttl,client) VALUES ($url,$created,$ttl,$client)', row, function(err) {
    if (typeof next === "function") {
      if (err) {
        console.log(err);
        next(null);
      } else {
        next(this.lastID, {
          url: url,
          created: row.$created,
          ttl: row.$ttl,
          client: row.$client,
        });
      }
    }
  });
}

process.on('exit', function() {
  db.close();
});

module.exports = {
  getURL: getURL,
  // urlExists: urlExists,
  registerURL: registerURL,
};