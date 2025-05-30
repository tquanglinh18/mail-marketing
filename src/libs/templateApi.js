import axiosClient from './axiosClient';

const templateApi = {
  create: (data) => {
    const url = '/Template/CreateTemplate';
    return axiosClient.post(url, data);
  },

  getAll: () => {
    const url = '/Template/GetAllTemplates';
    return axiosClient.get(url);
  },

  getById: (id) => {
    const url = `/Template/GetTemplateById/${id}`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `/Template/DeleteTemplate/${id}`;
    return axiosClient.delete(url);
  },
};

export default templateApi;