import axios from "axios";


// Export an object containing methods we'll use for accessing the API


export default {
  findShops: function (location) {
    return axios.get("/api/google/", { params: { location } });
  },

  findGeolocation: function (location) {
    return axios.get("/api/google/address/", { params: { location } });
  },


  getDrink: function (id) {
    return axios.get("/api/drinks/" + id);
  },
  // Gets the user with the given id
  createDrink: function (body) {
    // console.log(clientId, drinkObj)
    // return axios.put("/api/drinks/create/" + clientId + "/" + drinkObj);
    return axios.put("/api/drinks/create/", body);
  },

  // Gets the user with the given id
  getAllUserDrinks: function (clientId) {
    return axios.get("/api/drinks/all/" + clientId);
  },

  findUser: function (clientId) {
    return axios.get("/api/user/" + clientId);

  },

  getUserFaves: function (clientId) {
    return axios.get("/api/user/faves/" + clientId);
  },

  // Gets all saved users
  createUser: function (body) {
    return axios.post("/api/okta/create/", body);
  },




  // Updates the saved user with the given id
  addUserFave: function (body) {
    return axios.put("/api/user/fave/", body);
  },

  // Updates the saved user with the given id
  removeUserFave: function (body) {
    return axios.put("/api/user/unfave/", body);
  },

  addUserBan: function (body) {
    return axios.put("/api/user/ban/", body);
  },

  removeUserBan: function (body) {
    return axios.put("/api/user/unban/", body);
  },
}