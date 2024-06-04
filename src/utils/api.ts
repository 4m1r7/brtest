const APP_URL = import.meta.env.VITE_APP_URL;

import axios from "axios";

export const api = axios.create({
  baseURL: APP_URL,
});

export const routes = {
  login: "auth/login",
  logout: "auth/logout",
  user: "profile",
};
