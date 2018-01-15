// server.js
const express = require('express');
const app = express();
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
    console.log("Post request")
});

// 
// 
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);