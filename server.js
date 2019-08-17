const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// serve static assets normally
app.use(express.static(__dirname + '/public'))

// handle every other route with index.html, which will contain a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.join(__dirname, '/client/build/index.html'))
})


// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/Barisso', {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);