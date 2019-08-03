const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator"
)
const userSchema = new Schema({
  clientId: { type: String, required: true, unique: true },
  faveDrinks: { type: Array },
  userDrinks: { type: Object },
  faveShops: { type: Array, unique: true },
  banShops: { type: Array, unique: true }

});

const User = mongoose.model("User", userSchema);

userSchema.plugin(uniqueValidator);

module.exports = User;
