import { ApiEndpoints } from "../constants/ApiEndpoints";
import type { EmailTemplate } from "../types/APIModel";
import axiosClient from "./axiosClient";

const TemplateApi = {
  create: (data: EmailTemplate): Promise<EmailTemplate> => {
    const url = ApiEndpoints.TEMPLATE.CREATE;
    return axiosClient.post(url, data);
  },

  getAll: (): Promise<EmailTemplate[]> => {
    const url = ApiEndpoints.TEMPLATE.GET_ALL;
    return axiosClient.get(url);
  },

  getById: (id: number): Promise<EmailTemplate> => {
    const url = ApiEndpoints.TEMPLATE.BY_ID_BASE + `/${id}`;
    return axiosClient.get(url);
  },

  delete: (id: number) => {
    const url = ApiEndpoints.TEMPLATE.DELETE_BASE + `/${id}`;
    return axiosClient.delete(url);
  },
};

export default TemplateApi;
