/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true // ✅ Enables sending refreshToken cookie automatically
});

// 🔐 Request Interceptor: Add Auth Header
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("authToken");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ================= REFRESH TOKEN LOGIC START ================= //

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

// ❌ Response Interceptor: Auto Refresh Token on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 🧠 Skip refresh logic for these routes
    const skipRefreshRoutes = ['/auth/signin', '/auth/signup'];
    if (skipRefreshRoutes.some((path) => originalRequest.url?.includes(path))) {
      // Just reject the error normally
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = (refreshResponse.data as any).accessToken;

        Cookies.set("authToken", newAccessToken);
        apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        Cookies.remove("authToken");
        toast.error("Session expired. Please sign in again.");
        window.location.href = "/auth/signin";
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


// ================= REFRESH TOKEN LOGIC END ================= //

// 🚀 API Utility Methods
const apiService = {
    get<T = any>(url: string, params: object = {}): Promise<AxiosResponse<T>> {
        return apiClient.get<T>(url, { params });
    },
    post<T = any>(url: string, data: any): Promise<AxiosResponse<T>> {
        return apiClient.post<T>(url, data);
    },
    put<T = any>(url: string, data: any): Promise<AxiosResponse<T>> {
        return apiClient.put<T>(url, data);
    },
    delete<T = any>(url: string): Promise<AxiosResponse<T>> {
        return apiClient.delete<T>(url);
    },
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return apiClient.patch<T>(url, data, config);
    }
};

export default apiService;
