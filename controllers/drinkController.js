const db = require("../models");

module.exports = {

  getAllUserDrinks: function(req, res) {
    db.User.find({ clientId: req.params.clientId })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  createDrink: function(req, res) {
      console.log("You created a drink!")
      console.log(req.body)
    //   console.log(req.params.clientId)
    //   db.User.findOneAndUpdate({ clientId: req.params.clientId }, { $push: { userDrinks: req.params.drinkObj } })
      db.User.findOneAndUpdate({ clientId: req.body.clientId }, { $push: { userDrinks: req.body.drinkObj } })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }

};
