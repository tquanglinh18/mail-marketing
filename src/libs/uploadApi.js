import axiosClient from './axiosClient';

const uploadApi = {
  uploadFile: (formData) => {
    const url = '/Upload/UploadFile';
    return axiosClient.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
  },
};

export default uploadApi;