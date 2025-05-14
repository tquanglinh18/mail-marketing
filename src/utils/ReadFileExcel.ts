import React from "react";
import * as XLSX from "xlsx";
import type { ExcelDataModel } from "../types/DTO/ExcelDataModel";

export const handleFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
        const worksheet = workbook.Sheets[sheetName];
        const json: ExcelDataModel[] = XLSX.utils.sheet_to_json(worksheet);

        return json; // Trả về dữ liệu dưới dạng JSON
      } catch (err) {
        alert("Lỗi khi đọc file. Vui lòng đảm bảo đây là file .xlsx hợp lệ.");
        console.error(err);
        return;
      }
    };

    reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
  } else {
    alert("Vui lòng chọn file .xlsx để tải lên.");
    console.error("No file selected.");
    return;
  }
};
