import React, { useState } from "react";
import type { ExcelDataModel } from "../../types/ExcelDataModel";
import { handleFileUpload } from "../../utils/ReadFileExcel";
import RecipientsApi from "../../libs/RecipientsApi";
import Swal from "sweetalert2";

const UploadFileRecipient: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<ExcelDataModel[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [header, setHeader] = useState<string[]>([]);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setExcelData(null);
    setError(null);
    const fileSel = event.target.files?.[0];
    if (fileSel) {
      setFile(fileSel);
    }

    try {
      const data = await handleFileUpload(event);
      setTimeout(() => {
        setExcelData(data.data);
        setFileName(data?.filename);
        setHeader(data?.header);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi không xác định khi đọc file.");
    }
  };

  const handleUploadFileToS3 = async () => {
    setLoading(true);
    if (!file) {
      console.error("Upload thất bại 😢: ", error);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "batchName",
      file.name + " - " + new Date().toLocaleDateString("vi-VN")
    );

    try {
      const response = await RecipientsApi.uploadRecipientFromExcel(formData);
      setTimeout(() => {
        setLoading(false);
        Swal.fire({
          title: "Upload thành công",
          icon: "success",
          confirmButtonText: "Xác nhận",
          text: response.message,
        }).then(() => {
          window.location.href = "/";
        });
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "Thất bại",
        icon: "error",
        confirmButtonText: "Thử lại",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1024px] text-white mx-auto flex flex-col items-start justify-start min-h-screen text-center p-4">
      <h1 className="w-full text-center">
        Tải lên file Excel thông tin người nhận:
      </h1>
      <p
        className="w-full text-center mt-1 text-sm italic"
        id="file_input_help"
      >
        (*) Vui lòng chọn file Excel có định dạng .xlsx.
      </p>
      <form className="w-full flex flex-col items-center justify-center mt-4">
        <input
          className="hidden"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept=".xlsx"
          onChange={onFileChange}
        />
        <label
          className="w-fit block mb-2 text-sm font-medium text-gray-900"
          htmlFor="file_input"
        >
          <div className="cursor-pointer text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
            Chọn file
          </div>
        </label>

        {fileName && (
          <p className="text-sm mt-2">
            Upload thành công: &nbsp;
            <span className="text-green-500">{fileName}</span>
          </p>
        )}
      </form>
      {excelData && (
        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="flex justify-end">
            <button
              onClick={handleUploadFileToS3}
              className="w-fit text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              {loading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Đang tải lên...
                </>
              ) : (
                "Upload"
              )}
            </button>
          </div>
          <div className="w-full ">
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  {header.map((col, index) => (
                    <th key={index} className="border px-4 py-2">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {header.map((col, colIndex) => (
                      <td key={colIndex} className="border px-4 py-2">
                        {row[col as keyof ExcelDataModel]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
    </div>
  );
};

export default UploadFileRecipient;
