const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  clientId: { type: String, required: true},
  drinks: { type: Object },
  faveShops: { type: Object},
  banShops: { type: Object }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
