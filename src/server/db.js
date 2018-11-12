
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './db/url.db';

var db = new sqlite3.Database(DB_PATH);

function init() {
  var db = new sqlite3.Database(DB_PATH);
  db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="urls";', function(err, row) {
    if (err) {

    } else if (typeof row === 'undefined') {

      /* urls table doesn't exists, create it */
      db.run('CREATE TABLE urls (url TEXT, created DATETIME, ttl INTEGER, client TEXT)');

      /* Seed url table */
      var now = Date.now();
      var stmt = db.prepare('INSERT INTO urls (url,created,ttl,client) VALUES (?,?,?,?)');
      stmt.run('https://www.google.com', now, 86400, '127.0.0.1');
      stmt.run('https://www.reddit.com', now, 86400, '127.0.0.1');
      stmt.run('https://www.youtube.com', now, 86400, '127.0.0.1');
      stmt.finalize();
    }
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
  DB_PATH: DB_PATH,
  init: init,
  getURL: getURL,
  registerURL: registerURL,
};