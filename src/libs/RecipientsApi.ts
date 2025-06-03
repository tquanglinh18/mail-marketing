import { ApiEndpoints } from "../constants/ApiEndpoints";
import type { EmailRecipient, UploadBatch } from "../types/APIModel";
import axiosClient from "./axiosClient";

const RecipientsApi = {
  getAllRecipients: (): Promise<EmailRecipient[]> => {
    const url = ApiEndpoints.RECIPIENT.GET_ALL;
    return axiosClient.get(url);
  },

  getRecipientById: (id: number | string): Promise<EmailRecipient> => {
    const url = `${ApiEndpoints.RECIPIENT.BY_ID_BASE}/${id}`;
    return axiosClient.get(url);
  },

  searchByKeyword: (keyword: string): Promise<EmailRecipient[]> => {
    const url = `${ApiEndpoints.RECIPIENT.SEARCH_BASE}?keyword=${keyword}`;
    return axiosClient.get(url);
  },

  // Hàm upload (dùng path tĩnh)
  uploadRecipientFromExcel: (formData: FormData): Promise<UploadBatch> => {
    const url = ApiEndpoints.RECIPIENT.UPLOAD_EXCEL;
    return axiosClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getRecipientsByBatchId: (
    batchId: number | string
  ): Promise<EmailRecipient[]> => {
    const url = `${ApiEndpoints.RECIPIENT.RECIPIENTS_BY_BATCH_BASE}/${batchId}`;
    return axiosClient.get(url);
  },
};

export default RecipientsApi;
