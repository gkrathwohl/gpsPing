var express = require('express')
var app = express()

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('pingDB.db')

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/setup', function (req, res) {
  db.run('CREATE TABLE pings (time INT, latitude REAL, longitude REAL, speed REAL)')
  res.send('setup!')
})

app.post('/ping', function (req, res) {

  console.log(req.body)
  req.body.locations.each(function(location){
    db.serialize(function () {
      db.run("INSERT INTO pings VALUES (" + location.time, + "," + location.latitude, + "," + location.longitude, + "," + location.speed + ")")
      db.all('SELECT time FROM pings', function (err, row) {
        console.log(row)
      })
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
