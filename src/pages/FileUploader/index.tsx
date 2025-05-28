// File: src/components/FileUploader.tsx

import React, { useState } from "react";
import axios, { AxiosError } from "axios"; // Import Axios và AxiosError

// =========================================================================
// !!! THAY ĐỔI URL NÀY THÀNH URL API BACKEND CỦA BẠN !!!
const API_UPLOAD_URL = "http://localhost:5184/Upload/upload";
// =========================================================================

// (Tùy chọn) Định nghĩa kiểu dữ liệu cho phản hồi lỗi từ server
interface ServerErrorResponse {
  message?: string;
  // Thêm các thuộc tính lỗi khác nếu backend của bạn trả về
}

// (Tùy chọn) Định nghĩa kiểu dữ liệu cho phản hồi thành công từ server
interface ServerSuccessResponse {
  message: string;
  key: string;
}

const FileUploader: React.FC = () => {
  // State để lưu file đã chọn
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // State để lưu tiến trình upload (%)
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // State để lưu trạng thái (thành công/lỗi)
  const [uploadStatus, setUploadStatus] = useState<string>("");
  // State để biết đang upload hay không, dùng để vô hiệu hóa nút/input
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Hàm xử lý khi người dùng chọn file
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy file từ event (chỉ lấy file đầu tiên nếu người dùng chọn nhiều)
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      // (Tùy chọn) Kiểm tra kích thước file phía client
      const maxSize = 10 * 1024 * 1024; // 10 MB
      if (file.size > maxSize) {
        setUploadStatus("Lỗi: Kích thước file quá lớn (tối đa 10MB).");
        setSelectedFile(null);
        event.target.value = ""; // Reset input để người dùng có thể chọn lại file cũ nếu muốn
        return;
      }
      setSelectedFile(file);
      setUploadStatus(""); // Reset trạng thái
      setUploadProgress(0); // Reset tiến trình
    } else {
      setSelectedFile(null);
    }
  };

  // Hàm xử lý khi nhấn nút "Upload"
  const handleUploadClick = async () => {
    if (!selectedFile) {
      setUploadStatus("Lỗi: Vui lòng chọn một file.");
      return;
    }

    // Tạo đối tượng FormData
    const formData = new FormData();
    formData.append("file", selectedFile); // Tên 'file' PHẢI KHỚP với backend

    // Chuẩn bị và bắt đầu Upload
    setIsUploading(true);
    setUploadStatus("Đang tải lên...");
    setUploadProgress(0);

    try {
      // Gọi API backend bằng Axios
      const response = await axios.post<ServerSuccessResponse>(
        API_UPLOAD_URL,
        formData,
        {
          // Cấu hình Axios
          headers: {
          },
          // Theo dõi tiến trình upload
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            // Đảm bảo total không phải là null hoặc undefined trước khi tính toán
            const totalSize = total ?? 0;
            if (totalSize > 0) {
              const percentCompleted = Math.round((loaded * 100) / totalSize);
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      // Xử lý thành công
      setUploadStatus(`Upload thành công! Key: ${response.data.key}`);
      console.log("Upload Success:", response.data);
    } catch (error: unknown) {
      // <-- Xử lý lỗi với kiểu 'unknown'
      setUploadProgress(0); // Reset tiến trình khi có lỗi

      // Kiểm tra xem có phải là lỗi từ Axios không
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ServerErrorResponse>; // Ép kiểu để có gợi ý code

        if (axiosError.response) {
          // Server trả về lỗi
          const errorMessage =
            axiosError.response.data?.message ||
            axiosError.response.statusText ||
            `Lỗi server (${axiosError.response.status})`;
          setUploadStatus(`Lỗi Upload: ${errorMessage}`);
          console.error("Server Error:", axiosError.response);
        } else if (axiosError.request) {
          // Không kết nối được server
          setUploadStatus(
            "Lỗi Upload: Không thể kết nối đến server. Kiểm tra URL API và CORS."
          );
          console.error("Network Error:", axiosError.request);
        } else {
          // Lỗi khác của Axios
          setUploadStatus(`Lỗi Axios: ${axiosError.message}`);
          console.error("Axios Setup Error:", axiosError.message);
        }
      } else if (error instanceof Error) {
        // Nếu là một lỗi Error thông thường
        setUploadStatus(`Lỗi: ${error.message}`);
        console.error("Generic Error:", error.message);
      } else {
        // Nếu không biết là lỗi gì
        setUploadStatus("Lỗi không xác định đã xảy ra.");
        console.error("Unknown Error:", error);
      }
    } finally {
      // Luôn đặt lại cờ isUploading
      setIsUploading(false);
    }
  };

  const handleGetData = async ()=> {
    const response = await axios.get(API_UPLOAD_URL, {
      headers: {
        
      },
    });
    console.log("Dữ liệu từ server:", response.data);
  }

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <h3
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Upload File Lên Server (React + TS + Axios)
      </h3>

      {/* Input chọn file */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="fileInput"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Chọn file:
        </label>
        <input
          id="fileInput"
          type="file"
          onChange={handleFileSelect}
          disabled={isUploading}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "95%",
          }}
        />
      </div>

      {/* Hiển thị file đã chọn */}
      {selectedFile && !isUploading && (
        <p style={{ fontSize: "0.9em", color: "#555" }}>
          Đã chọn: <strong>{selectedFile.name}</strong> (
          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}

      {/* Nút Upload */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleUploadClick}
          disabled={!selectedFile || isUploading}
          style={{
            padding: "10px 25px",
            fontSize: "1em",
            cursor: "pointer",
            backgroundColor: isUploading ? "#aaa" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            opacity: !selectedFile || isUploading ? 0.6 : 1,
          }}
        >
          {isUploading ? "Đang tải..." : "Upload File"}
        </button>
      </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleGetData}
          style={{
            padding: "10px 25px",
            fontSize: "1em",
            cursor: "pointer",
            color: "white",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#28a745",
          }}
        >
         GetData
        </button>
      </div>

      {/* Thanh tiến trình */}
      {isUploading && (
        <div
          style={{
            marginTop: "20px",
            width: "100%",
            backgroundColor: "#eee",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${uploadProgress}%`,
              backgroundColor: "#4CAF50",
              color: "white",
              textAlign: "center",
              lineHeight: "22px",
              height: "22px",
              transition: "width 0.3s ease-in-out",
            }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}

      {/* Trạng thái Upload */}
      {uploadStatus && (
        <p
          style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "4px",
            fontWeight: "bold",
            backgroundColor: uploadStatus.startsWith("Lỗi")
              ? "#f8d7da"
              : "#d4edda",
            color: uploadStatus.startsWith("Lỗi") ? "#721c24" : "#155724",
            border: `1px solid ${
              uploadStatus.startsWith("Lỗi") ? "#f5c6cb" : "#c3e6cb"
            }`,
          }}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
 