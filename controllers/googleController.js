const axios = require("axios");
const db = require("../models");
require('dotenv').config();






// Defining methods for the googleController

// findAll searches the Google Books API and returns only the entries we haven't already saved



// It also makes sure that the books returned from the API all contain a title, author, link, description, and image
module.exports = {
  findShops: function (req, res) {
    const apiKEY = process.env.REACT_APP_SHOP_API_KEY;
    console.log("QString:" + "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req + "&radius=500&types=cafe&keyword=coffee&key=" + apiKEY)
    

    // const { query: params } = req;
    axios
      .get("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req + "&radius=500&types=cafe&keyword=coffee&key=" + apiKEY)
      
      .then(results =>
        console.log(results)
      )
      .then(coffee => res.json(coffees))
      
    // .then(apiBooks =>
    //     db.Book.find().then(dbBooks =>
    //       apiBooks.filter(apiBook =>
    //         dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
    //       )
    //     )
    //   )
    // .then(books => res.json(books))
    // .catch(err => res.status(422).json(err));
}
};
