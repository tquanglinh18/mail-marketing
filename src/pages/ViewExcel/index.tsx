import React, { useState } from "react";
import type { ExcelDataModel } from "../../types/DTO/ExcelDataModel";
import { handleFileUpload } from "../../utils/ReadFileExcel";

const ViewExcel: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<ExcelDataModel[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [header, setHeader] = useState<string[]>([]);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setExcelData(null); // Reset dữ liệu cũ
    setError(null); // Reset lỗi cũ

    try {
      // CHỜ ĐỢI hàm handleFileUpload hoàn thành và trả về dữ liệu
      const data = await handleFileUpload(event);
      setExcelData(data.data); // Lưu dữ liệu vào state
      setFileName(data?.filename); // Lưu tên file vào state
      setHeader(data?.header); // Lưu header vào state
    } catch (err: any) {
      // Cần chỉ định kiểu cho err để truy cập message
      setError(err.message || "Đã xảy ra lỗi không xác định khi đọc file.");
    }
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto flex flex-col items-start justify-start min-h-screen text-center">
      <h1 className="w-full text-center">
        Tải lên file Excel thông tin người nhận:
      </h1>
      <p
        className="w-full text-center mt-1 text-sm text-gray-500 italic"
        id="file_input_help"
      >
        (*) Vui lòng chọn file Excel có định dạng .xlsx.
      </p>
      <form
        action=""
        className="w-full flex flex-col items-center justify-center mt-4"
      >
        <label
          className="w-full block mb-2 text-sm font-medium text-gray-900"
          htmlFor="file_input"
        >
          <div className="w-fit min-w-[120px] mx-auto bg-blue-500 text-black px-4 py-2 rounded-lg">
            Chọn file Excel
          </div>

          {fileName && (
            <div className="text-sm text-gray-500 mt-2">
              Upload thành công:{" "}
              <span className="text-green-500">{fileName}</span>
            </div>
          )}
        </label>
        <input
          className="hidden"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept=".xlsx"
          onChange={onFileChange}
        />
      </form>
      {excelData && (
        <div className="w-full mt-4">
          <h2>Dữ liệu từ Excel:</h2>
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

export default ViewExcel;
