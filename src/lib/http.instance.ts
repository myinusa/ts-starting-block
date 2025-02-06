import { API_URL } from "@/constants";
import logger from "@/lib/logger";
import axios, { AxiosInstance } from "axios";
import { logHttpRequestToDatabase } from "@/database/db-log";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    logger.debug("Request interceptor", {
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    logger.error("Request error", error);
    throw new Error("Request failed");
  },
);

api.interceptors.response.use(
  async (response) => {
    logger.debug("Response interceptor", response);
    await logHttpRequestToDatabase(
      response.config.method!,
      response.config.url!,
      response.config.headers,
      response.config.data,
      response.status,
      response.data,
    );
    return response;
  },
  async (error) => {
    logger.error("Response error", error);
    if (error.response) {
      await logHttpRequestToDatabase(
        error.config.method!,
        error.config.url!,
        error.config.headers,
        error.config.data,
        error.response.status,
        error.response.data,
      );
      switch (error.response.status) {
        case 401: {
          break;
        }
        case 403: {
          break;
        }
        case 500: {
          break;
        }
        default: {
          break;
        }
      }
    } else if (error.request) {
      logger.error("No response received", error.request);
    } else {
      logger.error("Error in setting up request", error.message);
    }
    throw new Error("Request failed");
  },
);

export default api;
