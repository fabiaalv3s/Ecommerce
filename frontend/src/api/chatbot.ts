import api from './api';

export interface ChatbotMessage {
  message: string;
}

export interface ChatbotResponse {
  response: string;
}

export const chatbotApi = {
  sendMessage: async (message: string): Promise<ChatbotResponse> => {
    const response = await api.post('/chatbot/message', { message });
    return response.data;
  },
};


