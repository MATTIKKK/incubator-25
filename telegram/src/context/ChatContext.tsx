import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Chat, Message, User } from '../types';
import { initialChats, currentUser, contacts } from '../data/mockData';

interface ChatContextType {
  chats: Chat[];
  currentUser: User;
  contacts: User[];
  activeChat: Chat | null;
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (chatId: string, text: string) => void;
  updateProfile: (user: User) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatsState, setChats] = useState<Chat[]>(initialChats);
  const [activeChatState, setActiveChatState] = useState<Chat | null>(null);
  const [currentUserState, setCurrentUser] = useState<User>(currentUser);

  const setActiveChat = (chat: Chat | null) => {
    setActiveChatState(chat);
  };

  const sendMessage = (chatId: string, text: string) => {
    if (!text.trim()) return;
    
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: currentUserState.id,
            text,
            timestamp: new Date().toISOString(),
            isRead: false,
          };
          
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage,
          };
        }
        return chat;
      });
    });
  };

  const updateProfile = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <ChatContext.Provider
      value={{
        chats: chatsState,
        currentUser: currentUserState,
        contacts,
        activeChat: activeChatState,
        setActiveChat,
        sendMessage,
        updateProfile,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};