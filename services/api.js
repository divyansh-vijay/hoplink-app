import axios from "axios";

const API = axios.create({
  baseURL: "http://10.12.0.97:5000/api",
});

export default API;
