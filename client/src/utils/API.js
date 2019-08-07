import axios from "axios";


// Export an object containing methods we'll use for accessing the API


export default {
  findShops: function (location) {
    return axios.get("/api/google/", { params: { location } });
  },


  getShop: function (placeid) {
    return axios.get("/api/google/", { params: { placeid } });
  },

  // Gets the user with the given id
  getDrink: function (id) {
    return axios.get("/api/drinks/" + id);

  },

  getUserFaves: function (clientId) {
    return axios.get("/api/user/faves/" + clientId);
  },

  // Gets all saved users
  createUser: function (clientId) {
    return axios.post("/api/user/" + clientId);
  },
  // Updates the saved user with the given id
  addUserFave: function (clientId, shopId) {
    return axios.put("/api/user/fave/" + clientId + "/" + shopId);
  },

  // Updates the saved user with the given id
  removeUserFave: function (clientId, shopId) {
    return axios.put("/api/user/unfave/" + clientId + "/" + shopId);
  },

  addUserBan: function (clientId, shopId) {
    return axios.put("/api/user/ban/" + clientId + "/" + shopId);
  },

  removeUserFave: function (clientId, shopId) {
    return axios.put("/api/user/unban/" + clientId + "/" + shopId);
  },
}