import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { API_BASE_URL } from "../config/env";
import { ApiError } from "../types";

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    // TODO: Get token from secure storage
    const token = ""; // await getStoredToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return the response data directly
    return response;
  },
  (error: AxiosError) => {
    // Handle different types of errors
    const apiError: ApiError = {
      message: "An unexpected error occurred",
      statusCode: 500,
    };

    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as any;
      apiError.message =
        responseData?.message || responseData?.error || "Server error";
      apiError.statusCode = error.response.status;
      apiError.error = responseData?.error;
      apiError.details = responseData?.details;
    } else if (error.request) {
      // Request was made but no response received
      apiError.message = "Network error - please check your connection";
      apiError.statusCode = 0;
    } else {
      // Something else happened
      apiError.message = error.message || "Request setup error";
    }

    // Log error for debugging
    console.error("API Error:", {
      message: apiError.message,
      statusCode: apiError.statusCode,
      url: error.config?.url,
      method: error.config?.method,
    });

    return Promise.reject(apiError);
  }
);

export default apiClient;
