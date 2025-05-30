import type { ExcelDataModel } from "./ExcelDataModel";

export interface ParsedExcelData {
  data: ExcelDataModel[];
  filename: string;
  size: number;
  header: string[];
}
