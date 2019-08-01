const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/barisso"
);

const shopSeed = [
  {
    placeID: "ChIJVVWV9SkF9YgRtJoGM2AKDU4",
    name: "Metrotainment Cafes",
    userRatings: [

    ],
    userFaves: [

    ],
    userBans: [

    ]
  }
];

db.Shops
  .remove({})
  .then(() => db.Shops.collection.insertMany(shopSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
