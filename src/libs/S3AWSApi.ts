import { ApiEndpoints } from "../constants/ApiEndpoints";
import type { FileS3Response } from "../types/APIModel";
import axiosClient from "./axiosClient";

const S3AWSApi = {
  uploadFile: (formData: FormData): Promise<FileS3Response> => {
    const url = ApiEndpoints.S3AWS.UPLOAD_FILE;
    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getFileBucket: (): Promise<FileS3Response[]> => {
    const url = ApiEndpoints.S3AWS.GET_FILE_BUCKET;
    return axiosClient.get(url);
  },
};

export default S3AWSApi;
