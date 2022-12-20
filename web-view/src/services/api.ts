import axios from "axios";

export const notificationsAPI = axios.create({
  baseURL: "http://localhost:3000/notifications",
  headers: {
    common: {
      ContentType: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  },
});
