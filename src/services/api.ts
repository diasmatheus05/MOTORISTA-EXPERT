import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.uber.com/v1/",
  headers: { Authorization: "Bearer " },
});
