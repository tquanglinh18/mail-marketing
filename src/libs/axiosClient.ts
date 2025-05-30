import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import type { ResponseDTO } from "../types/APIModel";

// Tạo Axios Instance

const apiURL = import.meta.env.VITE_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("Sending Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  // Hàm này chạy khi response có status 2xx (Thành công về mặt HTTP)
  (response: AxiosResponse<ResponseDTO<any>>) => {
    const apiResponse: ResponseDTO<any> = response.data;

    if (apiResponse && apiResponse.isSuccessed) {
      return apiResponse.data;
    }

    // Ném lỗi khi isSuccessed = false
    const errorMessage =
      apiResponse?.message || "API trả về lỗi nhưng không có message.";
    throw new Error(errorMessage);
  },
  // Hàm này chạy khi response có status khác 2xx (Lỗi HTTP) hoặc lỗi mạng
  (error) => {
    console.error("Lỗi Axios Interceptor:", error);

    let errorMessage = "Đã có lỗi xảy ra từ máy chủ hoặc mạng.";

    if (error.response) {
      const apiError: ResponseDTO<any> = error.response.data;
      errorMessage =
        apiError?.message || error.response.data?.message || error.message;
    } else if (error.request) {
      errorMessage =
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.";
    } else {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
);

export default axiosClient;
