import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
}
const axiosInstance=axios.create({
        baseURL:API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            },
    }
)

axiosInstance.interceptors.request.use(
  (config) => {
    const customConfig = config as CustomAxiosRequestConfig;

    const token = localStorage.getItem("accessToken");

    if (token && !customConfig.skipAuth) {
      customConfig.headers = customConfig.headers || {};
      customConfig.headers["Authorization"] = `Bearer ${token}`;
    }

    return customConfig;
  }
);


export default axiosInstance;