const db = require("../models");

// Defining methods for the userController
module.exports = {

  getAllUserDrinks: function(req, res) {
    db.User.find({ clientId: req.params.clientId })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
