const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userID: { type: String, required: true},
  faveDrinks: { type: Array },
  userDrinks: { type: Object },
  faveShops: { type: Array },
  banShops: { type: Array }

});

const User = mongoose.model("User", userSchema);

module.exports = User;
