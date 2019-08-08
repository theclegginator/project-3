const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new Schema({
  clientId: { type: String, required: true, unique: true },
  faveDrinks: { type: Array },
  userDrinks: { type: Object },
  faveShops: { type: Array },
  banShops: { type: Array }

});

const User = mongoose.model("User", userSchema);

userSchema.plugin(uniqueValidator);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

module.exports = User;
