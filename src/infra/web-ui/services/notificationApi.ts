import axios from "axios";
import { Notification } from "../types/notification";

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

export const getNotificationsToRecipient = (): Promise<Notification[]> => {
  return notificationsAPI
    .get("/from/da1f365e-501d-4242-aec6-e50bbcab8d45")
    .then((response) => response.data?.notifications);
};

export const markToRead = (notificationId: string): Promise<void> => {
  return notificationsAPI.patch(`${notificationId}/read`);
};
