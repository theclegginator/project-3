const axios = require("axios");
const db = require("../models");

// Defining methods for the googleController

// findAll searches the Google Books API and returns only the entries we haven't already saved

// It also makes sure that the books returned from the API all contain a title, author, link, description, and image
module.exports = {
  findShops: function (req, res) {
    const { query: params } = req;
    axios
      .get("https://www.googleapis.com/books/v1/volumes" + params + "&radius=500&types=cafe&keyword=coffee&key=AIzaSyCxeEckegkJGYHdtjZkrWJANCGAiVi5NRk")
      
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
