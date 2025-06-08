import { apiClient } from './client';
import type { Chat, ChatResponse, Message } from '../types/chat';

export const chatService = {
  // Get all chats for the current user
  getChats: async (page = 1, limit = 20): Promise<ChatResponse> => {
    const { data } = await apiClient.get<ChatResponse>('/chats', {
      params: { page, limit },
    });
    return data;
  },

  // Get a single chat by ID
  getChat: async (chatId: string): Promise<Chat> => {
    const { data } = await apiClient.get<Chat>(`/chats/${chatId}`);
    return data;
  },

  // Get messages for a chat
  getMessages: async (
    chatId: string,
    page = 1,
    limit = 50
  ): Promise<{ messages: Message[]; hasMore: boolean }> => {
    const { data } = await apiClient.get<{
      messages: Message[];
      hasMore: boolean;
    }>(`/chats/${chatId}/messages`, {
      params: { page, limit },
    });
    return data;
  },

  // Send a message
  sendMessage: async (
    chatId: string,
    content: string,
    attachments?: File[]
  ): Promise<Message> => {
    const formData = new FormData();
    formData.append('content', content);

    if (attachments?.length) {
      attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    const { data } = await apiClient.post<Message>(
      `/chats/${chatId}/messages`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },

  // Create a new chat
  createChat: async (
    participantIds: string[],
    type: 'private' | 'group',
    name?: string
  ): Promise<Chat> => {
    const { data } = await apiClient.post<Chat>('/chats', {
      participantIds,
      type,
      name,
    });
    return data;
  },
};
