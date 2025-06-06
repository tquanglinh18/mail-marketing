import { ApiEndpoints } from "../constants/ApiEndpoints";
import type { ResponseDTO, SendMailRequest } from "../types/APIModel";
import axiosClient from "./axiosClient";

const SendMailApi = {
  sendMailWithMailgun: (
    request: SendMailRequest
  ): Promise<ResponseDTO<string>> => {
    const url = `${ApiEndpoints.SEND_MAIL.SEND_MAIL_WITH_MAILGUN}`;
    return axiosClient.post(url, request);
  },
};

export default SendMailApi;
