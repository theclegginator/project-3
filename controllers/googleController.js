const axios = require("axios");
const db = require("../models");
require('dotenv').config();






// Defining methods for the googleController

// findAll searches the Google Books API and returns only the entries we haven't already saved



// It also makes sure that the books returned from the API all contain a title, author, link, description, and image
module.exports = {
  findShops: function (req, res) {
    const apiKEY = process.env.REACT_APP_SHOP_API_KEY;
    console.log ("****REQ*****:", req.query.location)
    axios
      .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req.query.location + "&radius=12000&types=cafe&keyword=coffee&key=" + apiKEY)

      .then(results => {
        console.log("SHOW ME!");
        // console.log(results)
        // console.log(results.data)
        // res.json({
        //   msg: 'api',
        //   results: results
        // })
        res.json(results.data)
      })
    // .then(coffee => res.json(coffees))

    // .then(apiBooks =>
    //     db.Book.find().then(dbBooks =>
    //       apiBooks.filter(apiBook =>
    //         dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
    //       )
    //     )
    //   )
    // .then(books => res.json(books))
    // .catch(err => res.status(422).json(err));
  },

  // shopDetail: function (req, res) {
  //   const apiKEY = process.env.REACT_APP_SHOP_API_KEY;
  //   axios
  //   .get("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + req.shopID "&key=" + apiKEY)

  //   .then(results => {
  //     console.log("PLACE STUFF!");
  //     // console.log(results)
  //     // console.log(results.data)
  //     // res.json({
  //     //   msg: 'api',
  //     //   results: results
  //     // })
  //     res.json(place.data)
  // }
};
