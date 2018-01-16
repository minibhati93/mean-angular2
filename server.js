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
app.get('/kitchen', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db_handle;


MongoClient.connect(db_url, function (err, client) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    // Save database object from the callback for reuse.
    db_handle = client.db('dalviroo');
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

    //find if an order exists, we don't want duplicate orders 

    db_handle.collection(KITCHEN_COLLECTION).find({ $query: {name: newOrder.name }}).toArray(function(err, doc){ 
      
      if(doc == null ||  doc == '' || !doc){ // Insert the new order
        db_handle.collection(KITCHEN_COLLECTION).insertOne(newOrder, function(err, doc) {
            if (err) {
              handleError(res, err.message, "Failed to create new order.");
            }
            else {
              res.status(201).json(doc.ops[0]);
            }
        });
      }
      else if(doc){ // This order exists merge the quanitity
        let existingOrder = doc[0];
        // console.log(existingOrder);
        let newQuantity = parseInt(existingOrder.quantity)+parseInt(newOrder.quantity);
        
        let updateDoc = {quantity: newQuantity };
        
        db_handle.collection(KITCHEN_COLLECTION).updateOne({_id: new ObjectID(existingOrder._id)}, { $set: updateDoc }, function(err, doc) {
          if (err) {
            handleError(res, err.message, "Failed to update order");
          } 
          else {
            updateDoc._id = existingOrder._id;
            res.status(200).json(updateDoc);
          }
        });
      }

    }); 
});

/*  "/api/orders"
 *    GET: get all orders
*/

app.get('/api/orders', function(req, res) {

    db_handle.collection(KITCHEN_COLLECTION).find({}).toArray(function(err, result) {

      if(err){
        handleError(res, err.message, "Failed to get orders.");
      }
      else{
        res.send(JSON.stringify(result));
      }

    });
});

/* "/api/orders/:id"
 *    PUT: update value of the order
*/

app.put("/api/orders/:id", function(req, res) {
  
  var updateDoc = req.body;
  
  delete updateDoc._id;

  db_handle.collection(KITCHEN_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, { $set: updateDoc }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update order");
    } 
    else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});