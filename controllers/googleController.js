const axios = require("axios");
const db = require("../models");
require('dotenv').config();






// Defining methods for the googleController

// findAll searches the Google Books API and returns only the entries we haven't already saved



// It also makes sure that the books returned from the API all contain a title, author, link, description, and image
module.exports = {
  findShops: function (req, res) {
    const apiKEY = process.env.REACT_APP_SHOP_API_KEY;
    console.log("****REQ*****:", req.query.location)
    axios
      .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req.query.location + "&radius=12000&types=cafe&keyword=coffee&key=" + apiKEY)

      .then(results => {
        res.json(results.data)
      })

  },

  findGeolocation: function (req, res) {
    const apiKEY = process.env.REACT_APP_SHOP_API_KEY;
    console.log("ADDRESS", req.query.location)
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + req.query.location + "&key=" + apiKEY)

      .then(results => {
        console.log("API RESULT:", results.data)
        res.json(results.data)
      })
      .catch(error => {
        console.log(error.response)
      })
  }
};
