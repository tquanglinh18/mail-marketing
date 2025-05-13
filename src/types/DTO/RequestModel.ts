// models/RequestModel.ts

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequestModel {
  model: string;                  // ví dụ: "gpt-4"
  messages: Message[];            // danh sách các đoạn hội thoại
  temperature?: number;           // tùy chọn (0.0 - 2.0)
  top_p?: number;                 // tùy chọn (0.0 - 1.0)
  max_tokens?: number;           // giới hạn độ dài phản hồi
  stream?: boolean;              // dùng để nhận phản hồi dạng stream
  stop?: string[];               // chuỗi dừng
  presence_penalty?: number;
  frequency_penalty?: number;
  user?: string;                 // ID người dùng (tuỳ chọn)
}
