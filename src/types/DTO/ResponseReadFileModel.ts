import type { ExcelDataModel } from "./ExcelDataModel";

export interface ParsedExcelData {
  data: ExcelDataModel[];
  filename: string;
  size: number; // Kích thước file tính bằng bytes
  header: string[]; // Mảng chứa tên các cột (header)
}
