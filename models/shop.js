const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    placeID: { type: String, required: true },
    name: { type: String, required: true },
    userRatings: { type: Array },
    userFaves: { type: Object },
    userBans: { type: Object },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;