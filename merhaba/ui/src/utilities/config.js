const axios = require("axios");

export const axiosInstance = axios.create({
  baseURL:
    "http://finalproject-env-1.eba-anmhdzkz.us-east-1.elasticbeanstalk.com/api",
  /* other custom settings */
});

// module.exports = axiosInstance;
