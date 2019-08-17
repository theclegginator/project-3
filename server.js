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
// Serve up static assets
// app.use(express.static("public"));
// app.get('/react*', (req, res) => {
//   res.sendFile(appRootPath + '/public/index.html');
// });
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// serve static assets normally
app.use(express.static(__dirname + '/public'))

// console.log(path.join(__dirname, 'client/public', '/index.html'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  // response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  // response.sendFile(path.join(__dirname, 'client/public', '/index.html'))
  response.sendFile(path.join(__dirname, '/client/build/index.html'))
})

// app.get('/*', function(req, res) {
//   console.log(res)
//   res.sendFile(path.join(__dirname, '/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// });

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