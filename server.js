// server.js
const express = require('express');
const conf = require('./app-config');
const app = express();

//lets require/import the mongodb native drivers.

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const db_url = conf.MONGO_URL;


MongoClient.connect(db_url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', db_url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});


// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));


const path = require('path');
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// 
// New Order
// 
app.post('/api/new', function(req, res) {
    console.log("Post request");
    res.send('ok');
});

// 
// 
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);