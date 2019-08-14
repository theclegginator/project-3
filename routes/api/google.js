const router = require("express").Router();
const googleController = require("../../controllers/googleController");

// Matches with "/api/google"
router
  .route("/")
  .get(googleController.findShops);

  router
  .route("/address")
  .get(googleController.findGeolocation);

module.exports = router;