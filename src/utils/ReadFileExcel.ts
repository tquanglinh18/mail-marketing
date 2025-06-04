import React from "react";
import * as XLSX from "xlsx";
import type { ParsedExcelData } from "../types/ResponseReadFileModel";
import type { ExcelDataModel } from "../types/ExcelDataModel";

export const handleFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>
): Promise<ParsedExcelData> => {
  // Khai báo kiểu trả về là Promise
  return new Promise((resolve, reject) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json: ExcelDataModel[] = XLSX.utils.sheet_to_json(worksheet);
          const filename = file.name;
          const size = file.size;
          const header = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            range: 0,
          })[0] as string[]; // Lấy tên các cột (header)

          resolve({
            data: json,
            filename: filename,
            size: size,
            header: header,
          }); // Trả về dữ liệu qua Promise
          console.log("Dữ liệu Excel đã đọc:", {
            data: json,
            filename: filename,
            size: size,
            header: header,
          });
        } catch (err) {
          alert("Lỗi khi đọc file. Vui lòng đảm bảo đây là file .xlsx hợp lệ.");
          console.error(err);
          reject(err); // Trả về lỗi qua Promise
        }
      };

      reader.onerror = (error) => {
        // Xử lý lỗi khi đọc file
        console.error("Lỗi FileReader:", error);
        reject(new Error("Lỗi khi đọc file."));
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Vui lòng chọn file .xlsx để tải lên.");
      reject(new Error("Không có file được chọn.")); // Trả về lỗi nếu không có file
    }
  });
};
