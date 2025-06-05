import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Chat, Message, User } from '../types';
import { initialChats, currentUser, humanUsers, aiUsers } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAI } from '../hooks/useAI';
import { generateId } from '../utils/generateId';

type ChatContextType = {
  chats: Chat[];
  currentChat: Chat | null;
  currentUser: User;
  setCurrentChat: (chatId: string | null) => void;
  sendMessage: (text: string, replyTo?: Message) => void;
  markAsRead: (chatId: string) => void;
  createNewChat: (userId: string) => void;
  searchChats: (query: string) => Chat[];
  typing: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [storedChats, setStoredChats] = useLocalStorage<Chat[]>('chats', initialChats);
  const [chats, setChats] = useState<Chat[]>(storedChats);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const { getResponse, isLoading } = useAI();
  
  useEffect(() => {
    setStoredChats(chats);
  }, [chats, setStoredChats]);

  useEffect(() => {
    setTyping(isLoading);
  }, [isLoading]);
  
  const currentChat = currentChatId 
    ? chats.find(chat => chat.id === currentChatId) || null
    : null;

  const setCurrentChat = (chatId: string | null) => {
    setCurrentChatId(chatId);
    if (chatId) {
      markAsRead(chatId);
    }
  };

  const sendMessage = async (text: string, replyTo?: Message) => {
    if (!currentChatId || !text.trim()) return;

    const newMessage: Message = {
      id: generateId(),
      chatId: currentChatId,
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: new Date(),
      status: 'sending',
      replyToId: replyTo?.id,
      replyToMessage: replyTo ? {
        id: replyTo.id,
        text: replyTo.text,
        senderId: replyTo.senderId,
      } : undefined,
    };

    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage,
            unreadCount: 0,
          };
        }
        return chat;
      });
      return updatedChats;
    });

    setTimeout(() => {
      setChats(prevChats => {
        const updatedChats = prevChats.map(chat => {
          if (chat.id === currentChatId) {
            const updatedMessages = chat.messages.map(msg => {
              if (msg.id === newMessage.id) {
                return { ...msg, status: 'sent' as const };
              }
              return msg;
            });

            return {
              ...chat,
              messages: updatedMessages,
              lastMessage: { ...newMessage, status: 'sent' as const },
            };
          }
          return chat;
        });
        return updatedChats;
      });

      setTimeout(() => {
        setChats(prevChats => {
          const updatedChats = prevChats.map(chat => {
            if (chat.id === currentChatId) {
              const updatedMessages = chat.messages.map(msg => {
                if (msg.id === newMessage.id) {
                  return { ...msg, status: 'delivered' as const };
                }
                return msg;
              });

              return {
                ...chat,
                messages: updatedMessages,
                lastMessage: { ...newMessage, status: 'delivered' as const },
              };
            }
            return chat;
          });
          return updatedChats;
        });
      }, 1000);
    }, 700);

    const chat = chats.find(chat => chat.id === currentChatId);
    if (chat && chat.participants.some(user => user.isAI)) {
      const aiUser = chat.participants.find(user => user.isAI);
      if (aiUser) {
        setTimeout(async () => {
          const aiResponse = await getResponse(text);

          setChats(prevChats => {
            const updatedChats = prevChats.map(chat => {
              if (chat.id === currentChatId) {
                const aiMessage: Message = {
                  id: aiResponse.id,
                  chatId: currentChatId,
                  senderId: aiUser.id,
                  text: aiResponse.text,
                  timestamp: new Date(),
                  status: 'sent',
                  replyToId: newMessage.id,
                  replyToMessage: {
                    id: newMessage.id,
                    text: newMessage.text,
                    senderId: newMessage.senderId,
                  },
                };

                return {
                  ...chat,
                  messages: [...chat.messages, aiMessage],
                  lastMessage: aiMessage,
                };
              }
              return chat;
            });
            return updatedChats;
          });
        }, 2000);
      }
    }
  };

  const markAsRead = (chatId: string) => {
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = chat.messages.map(msg => {
            if (msg.senderId !== currentUser.id) {
              return { ...msg, status: 'read' as const };
            }
            return msg;
          });

          return {
            ...chat,
            messages: updatedMessages,
            unreadCount: 0,
            lastMessage: chat.lastMessage 
              ? { ...chat.lastMessage, status: 'read' as const } 
              : undefined,
          };
        }
        return chat;
      });
      return updatedChats;
    });
  };

  const createNewChat = (userId: string) => {
    const user = [...humanUsers, ...aiUsers].find(u => u.id === userId);
    if (!user) return;

    const existingChat = chats.find(chat => 
      chat.participants.length === 2 && 
      chat.participants.some(p => p.id === userId) &&
      chat.participants.some(p => p.id === currentUser.id)
    );

    if (existingChat) {
      setCurrentChatId(existingChat.id);
      return;
    }

    const newChat: Chat = {
      id: `chat-${generateId()}`,
      participants: [currentUser, user],
      messages: [],
      unreadCount: 0,
    };

    setChats(prevChats => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
  };

  const searchChats = (query: string): Chat[] => {
    if (!query.trim()) return chats;
    
    const lowercaseQuery = query.toLowerCase();
    
    return chats.filter(chat => {
      const participantMatch = chat.participants.some(
        user => user.id !== currentUser.id && user.name.toLowerCase().includes(lowercaseQuery)
      );
      
      const messageMatch = chat.messages.some(
        message => message.text.toLowerCase().includes(lowercaseQuery)
      );
      
      return participantMatch || messageMatch;
    });
  };

  return (
    <ChatContext.Provider value={{
      chats,
      currentChat,
      currentUser,
      setCurrentChat,
      sendMessage,
      markAsRead,
      createNewChat,
      searchChats,
      typing,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};