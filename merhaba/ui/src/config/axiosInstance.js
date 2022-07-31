import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    "http://finalproject-ENV-1.EBA-ANMHDZKZ.US-east-1.elasticbeanstalk.com/api/",
});
