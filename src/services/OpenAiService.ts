import axios from "axios";
import type { ChatResponseModel } from "../types/ResponseModel";
import type { ChatRequestModel, Message } from "../types/RequestModel";

export const sendQuestionToOpenAI = async (
  messages: Message[]
): Promise<string> => {
  const apikey = import.meta.env.VITE_OPENAI_API_KEY;
  const model = import.meta.env.VITE_OPENAI_MODEL;
  const url = import.meta.env.VITE_OPENAI_API_URL;
  const maxToken = import.meta.env.VITE_OPENAI_MAX_TOKEN;
  const temperature = import.meta.env.VITE_OPENAI_TEMPERATURE;

  if (!apikey) {
    console.error("API key is not defined");
  }

  const requestBody: ChatRequestModel = {
    model: model || "gpt-3.5-turbo",
    messages,
    temperature: temperature ? parseFloat(temperature) : 0.7,
    max_tokens: maxToken ? parseInt(maxToken) : 1000,
  };

  try {
    const response = await axios.post<ChatResponseModel>(
      `${url}/v1/chat/completions`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apikey}`,
        },
      }
    );

    // Lấy nội dung phản hồi đầu tiên từ AI
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Lỗi khi gọi OpenAI API:", error);
    return "Đã xảy ra lỗi khi kết nối với OpenAI.";
  }
};
