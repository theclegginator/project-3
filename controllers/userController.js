const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    db.User.find(req.query)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  getUserFaves: function(req, res) {
    db.User.find({ clientId: req.params.clientId })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  getAllUserDrinks: function(req, res) {
    db.User.find({ clientId: req.params.clientId }, {$pull: {userDrinks}})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  addUserFave: function(req, res) {
    console.log("You added that favorite!")
    db.User.findOneAndUpdate({ clientId: req.params.clientId}, {$push: {faveShops: req.params.shopId}})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  removeUserFave: function(req, res) {
    console.log("You removed that favorite!")
    db.User.findOneAndUpdate({ clientId: req.params.clientId}, {$pull: {faveShops: req.params.shopId}})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  addUserBan: function(req, res) {
    console.log("You banned that!")
    db.User.findOneAndUpdate({ clientId: req.params.clientId}, {$push: {banShops: req.params.shopId}})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.findById(req.params.clientId)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
