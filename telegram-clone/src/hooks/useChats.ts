import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { chatService } from '../api/chatService';
import type { Chat, Message } from '../types/chat';

export const useChats = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['chats', page, limit],
    queryFn: () => chatService.getChats(page, limit),
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => chatService.getChat(chatId),
    enabled: !!chatId,
  });
};

export const useMessages = (chatId: string) => {
  return useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: ({ pageParam = 1 }) => chatService.getMessages(chatId, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length + 1;
    },
    enabled: !!chatId,
  });
};

export const useSendMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      attachments,
    }: {
      content: string;
      attachments?: File[];
    }) => chatService.sendMessage(chatId, content, attachments),

    onSuccess: (newMessage: Message) => {
      // Update messages cache
      queryClient.setQueryData<{ pages: { messages: Message[] }[] }>(
        ['messages', chatId],
        (old) => {
          if (!old) return { pages: [{ messages: [newMessage] }] };
          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  messages: [newMessage, ...page.messages],
                };
              }
              return page;
            }),
          };
        }
      );

      // Update chat's last message
      queryClient.setQueryData<Chat>(['chat', chatId], (old) => {
        if (!old) return undefined;
        return {
          ...old,
          lastMessage: newMessage,
        };
      });
    },
  });
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participantIds,
      type,
      name,
    }: {
      participantIds: string[];
      type: 'private' | 'group';
      name?: string;
    }) => chatService.createChat(participantIds, type, name),

    onSuccess: (newChat: Chat) => {
      queryClient.setQueryData<{ chats: Chat[] }>(['chats'], (old) => {
        if (!old) return { chats: [newChat] };
        return {
          ...old,
          chats: [newChat, ...old.chats],
        };
      });
    },
  });
};
