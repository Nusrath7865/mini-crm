import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-crm-1-fc32.onrender.com/"
});

export default API;