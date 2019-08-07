const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/user/:id"
// router
//   .route("/:clientId")
//   .get(userController.findById)
//   .put(userController.update)
//   .delete(userController.remove);

router
  .route("/fave/:clientId/:shopId")
  .put(userController.addUserFave)

router
  .route("/remove/:clientId/:shopId")
  .put(userController.removeUserFave)

router
  .route("/faves/:clientId/")
  .get(userController.getUserFaves)

router
  .route("/ban/:clientId/:shopId")
  .put(userController.addUserBan)

module.exports = router;