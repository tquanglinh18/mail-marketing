import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import type { ResponseDTO } from "../types/APIModel";
import Swal from "sweetalert2";
import { ROUTES } from "../constants/routes";

const apiURL = import.meta.env.VITE_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("Sending Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      throw new Error("Yêu cầu quá thời gian chờ. Vui lòng thử lại.");
    }
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse<ResponseDTO<any>>) => {
    const apiResponse: ResponseDTO<any> = response.data;

    if (apiResponse && apiResponse.isSuccessed) {
      return apiResponse.data;
    }

    const errorMessage =
      apiResponse?.message || "API trả về lỗi nhưng không có message.";
    throw new Error(errorMessage);
  },

  (error) => {
    console.error("Lỗi Axios Interceptor:", error);

    let errorMessage = "Đã có lỗi xảy ra từ máy chủ hoặc mạng.";

    if (error.response) {
      const apiError: ResponseDTO<any> = error.response.data;
      errorMessage =
        apiError?.message || error.response.data?.message || error.message;
      Swal.fire({
        title: "Lỗi",
        icon: "error",
        text:
          apiError?.message || error.response.data?.message || error.message,
        confirmButtonText: "Về trang chủ",
        preConfirm: () => {
          window.location.href = ROUTES.DASHBOARD;
        },
      });
    } else if (error.request) {
      Swal.fire({
        title: "Lỗi",
        icon: "error",
        text: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.",
        confirmButtonText: "Về trang chủ",
        preConfirm: () => {
          window.location.href = ROUTES.DASHBOARD;
        },
      });
    } else {
      Swal.fire({
        title: "Lỗi",
        icon: "error",
        text: error.message,
        confirmButtonText: "Về trang chủ",
        preConfirm: () => {
          window.location.href = ROUTES.DASHBOARD;
        },
      });
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
);

export default axiosClient;
