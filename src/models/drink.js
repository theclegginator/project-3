const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const drinkSchema = new Schema({
  id: { type: Number, required: true},
  name: { type: String, required: true },
  ingredients: { type: Array, required: true },
  description: { type: String},
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
