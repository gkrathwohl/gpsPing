var express = require('express')
var app = express()

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('pingDB.db')


app.get('/setup', function (req, res) {
  db.run('CREATE TABLE pings (time DATETIME)')
  res.send('setup!')
})

app.post('/ping', function (req, res) {
  console.log(req)
  db.serialize(function () {
    db.run("INSERT INTO pings VALUES (datetime('now'))")
    db.all('SELECT time FROM pings', function (err, row) {
      console.log(row)
    })
  })
  res.send('ping!')
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
