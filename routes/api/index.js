const path = require("path");
const router = require("express").Router();
const userRoutes = require("./user");
const googleRoutes = require("./google");
const drinkRoutes = require("./drinks");


router.use("/user", userRoutes);

// Google Routes
router.use("/google", googleRoutes);

router.use("/drinks", drinkRoutes);

// // For anything else, render the html page
// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, "../../client/build/index.html"));
// });

module.exports = router;