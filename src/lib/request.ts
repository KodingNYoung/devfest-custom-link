import { API_BASEURL } from "@/utils/constants";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cache } from "react";

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export const requestHandler = cache(
  async (endpoint: string, payload?: unknown, options: FetcherOptions = {}) => {
    if (!API_BASEURL) {
      throw new Error("API URL is not defined");
    }

    const { method = "GET", headers = {} } = options;

    const requestOptions: AxiosRequestConfig = {
      url: API_BASEURL + endpoint,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: payload,
    };

    try {
      return await axios(requestOptions);
    } catch (err) {
      let message;
      if (err instanceof AxiosError) {
        message = err?.response?.data?.detail;
      } else {
        message = (err as Error).message;
      }
      return { data: { success: false, message } };
    }
  },
);
