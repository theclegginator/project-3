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

  // Gets all saved users
  createUser: function (clientId) {
    return axios.post("/api/" + clientId);
  },
  // Deletes the saved user with the given id
  updateUser: function (clientId) {
    return axios.put("/api/user/" + clientId);
  }
}