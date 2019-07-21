import axios from "axios";

// Export an object containing methods we'll use for accessing the API

export default {
  findShops: function(location) {
    return axios.get("api/google", { params: { location: lat + "," + long } });
    },
}