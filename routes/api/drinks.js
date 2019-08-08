const router = require("express").Router();
const drinkController = require("../../controllers/drinkController");

router 
  .route("/all/:clientId")
  .get(drinkController.getAllUserDrinks)

router 
  .route("/create/")
  .put(drinkController.createDrink)

module.exports = router;