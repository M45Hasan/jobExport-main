import axios from "axios";

const Api = axios.create({
  baseURL: "https://server.jobexpertbd.com",
 // baseURL: "http://localhost:5000",
});

// console.log(Api.defaults.baseURL);

export default Api;
