const db = require("../models");


// Defining methods for the userController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  createUser: function (req, res) {
    console.log("CREATED THAT USER DOCUMENT!")
    db.User.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  getUserFaves: function (req, res) {
    db.User.find({ clientId: req.params.clientId })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },


  getAllUserDrinks: function (req, res) {
    db.User.find({ clientId: req.params.clientId }) //, {$pull: {userDrinks}}
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  findUser: function (req, res) {
    console.log("Looking for that user!")
    db.User.find({ clientId: req.params.clientId })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  addUserFave: function (req, res) {
    console.log("You added that favorite!")
    console.log("BODY:", req.body)
    db.User.findOneAndUpdate({ clientId: req.body.clientId }, { $push: { faveShops: req.body.shop } })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  removeUserFave: function (req, res) {
    console.log("You removed that favorite!")
    db.User.findOneAndUpdate({ clientId: req.body.clientId }, { $pull: { faveShops: { id: req.body.shop.id } } }, { safe: true, multi: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },


  addUserBan: function (req, res) {
    console.log("You banned that!")
    db.User.findOneAndUpdate({ clientId: req.body.clientId }, { $push: { banShops: req.body.shop } })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  removeUserBan: function (req, res) {
    console.log("You removed that ban!")
    console.log("REQUEST:", req.body.shop)
    db.User.findOneAndUpdate({ clientId: req.body.clientId }, { $pull: { banShops: { id: req.body.shop.id } } }, { safe: true, multi: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },



  /* Create a new User (register). */
  

};
