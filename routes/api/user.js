const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
  .get(userController.findAll)

router.route("/create")
  .post(userController.createUser)

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
  .route("/unfave/:clientId/:shopId")
  .put(userController.removeUserFave)

router
  .route("/faves/:clientId/")
  .get(userController.getUserFaves)

router
  .route("/ban/:clientId/:shopId")
  .put(userController.addUserBan)


router
  .route("/unban/:clientId/:shopId")
  .put(userController.removeUserBan)

router
  .route("/api/drinks/all/:clientId")
  .get(userController.getAllUserDrinks)

router
  .route("/:clientId")
  .get(userController.findUser)

module.exports = router;