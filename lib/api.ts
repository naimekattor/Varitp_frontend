import axios from "axios";
import { getSession } from "next-auth/react";

export const getActiveLocale = () => {
  if (typeof window === "undefined") {
    return "hr";
  }

  const localeFromPath = window.location.pathname.split("/")[1];
  return localeFromPath === "en" || localeFromPath === "hr"
    ? localeFromPath
    : "hr";
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "any",
  },
});

// Interceptor to add access token to requests
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  config.headers["Accept-Language"] = getActiveLocale();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

export default api;
