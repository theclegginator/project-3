import axios from "axios";


// Export an object containing methods we'll use for accessing the API


export default {
  findShops: function (location) {
    return axios.get("/api/google/", { params: { location } });
  },


  getShop: function (shopID) {
    return axios.get("/api/google/", {params: { shopID } });
  },
  
  // Gets the book with the given id
  getDrink: function (id) {
    return axios.get("/api/drinks/" + id);

  }
}