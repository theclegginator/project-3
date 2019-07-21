const path = require("path");
const router = require("express").Router();
// const coffeeRoutes = require("./coffee");
const googleRoutes = require("./google");

// // Book routes
// router.use("/coffee", coffeeRoutes);

// Google Routes
router.use("/google", googleRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
