const router = require("express").Router();
const oktaController = require("../../controllers/oktaController");

// Matches with "/api/user"

router.route("/create/")
  .post(oktaController.createUser)

module.exports = router;