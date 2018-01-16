// server.js
const express = require('express');
const bodyParser = require("body-parser");

//lets require/import the mongodb native drivers.
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const db_url = "mongodb://test:test@ds257627.mlab.com:57627/dalviroo";
const KITCHEN_COLLECTION = "kitchen";

const app = express();
app.use(bodyParser.json());

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

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var database;


MongoClient.connect(db_url, function (err, client) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    // Save database object from the callback for reuse.
    database = client.db('dalviroo');
    console.log("Database connection ready");

    // Start the app by listening on the default
    // Heroku port
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is listening`);
    });

    // do some work here with the database.

    // Close connection
    // db.close();
  }
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// KITCHEN API ROUTES  ------------------------------------------------

/*  "/api/create"
 *    POST: create a new order
*/

app.post('/api/create', function(req, res) {
    var newOrder = req.body;

    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide an order.", 400);
    }

    database.collection(KITCHEN_COLLECTION).insertOne(newOrder, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new order.");
      }
      else {
        res.status(201).json(doc.ops[0]);
      }
  });
});

/*  "/api/orders"
 *    GET: get all orders
*/

app.get('/api/orders', function(req, res) {
    console.log("Reached here");
    database.collection(KITCHEN_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        console.log("error!")
        handleError(res, err.message, "Failed to get orders.");
      } else {
        console.log("success!")
        res.status(200).json(docs);
      }
    });
});

/* "/api/predict"
 *    PUT: update predicted value of the order
*/
