// models/ResponseModel.ts

export interface ChatChoice {
  index: number;
  message: {
    role: 'assistant' | 'user' | 'system';
    content: string;
  };
  finish_reason: string;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatResponseModel {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatChoice[];
  usage: Usage;
}
