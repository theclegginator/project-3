const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    placeID: { type: String, required: true },
    name: { type: String, required: true },
    userRatings: { type: Array },
    userFaves: { type: Array },
    userBans: { type: Array },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;