import axiosClient from './axiosClient';

const sendMailApi = {
  sendBulk: (data) => {
    const url = '/SendMail/SendBulkMail';
    return axiosClient.post(url, data);
  },
};

export default sendMailApi;