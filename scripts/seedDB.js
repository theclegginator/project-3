const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://192.168.99.100/barisso"
);

const userSeed = [
  {
    clientId: "0oa10n4ne7DzM0xRF357",
    faveDrinks: [],
    userDrinks: {},
    faveShops: [],
    banShops: []

  },

  {
    clientId: "0oa10n4ne7DzM0xRF357",
    faveDrinks: [],
    userDrinks: {},
    faveShops: [],
    banShops: []

  }
];

db.Users
  .remove({})
  .then(() => db.Users.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
