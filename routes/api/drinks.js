const router = require("express").Router();
const userController = require("../../controllers/drinkController");

router 
  .route("/all/:clientId")
  .get(userController.getAllUserDrinks)

module.exports = router;