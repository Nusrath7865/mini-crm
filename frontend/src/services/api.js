import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-crm-backend.onrender.com/api"
});

export default API;