import axios from "axios";

const API_URL = `https://fakestoreapi.com`;

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


