const express = require('express');

const path = require('path');

const api = require('./api');
const hash = require('./hash');
const db = require('./db');


var app = express();

app.use(express.urlencoded());

app.use('/api', api);


app.use('/', express.static('dist'));
app.get('/', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, "../../dist/ ")});
});

app.get('/:shorturl', function(req, res) {
  var ids = hash.decode(req.params.shorturl);
  if (ids.length > 0) {
    const id = ids[0];
    db.getURL(id, (url) => { res.redirect(url); });
  } else {
    console.log(req.params.shorturl);
    res.send('dead link');
  }
}); 


const PORT = 8000;
app.listen(PORT, () => console.log('Listening on port 8000!'));