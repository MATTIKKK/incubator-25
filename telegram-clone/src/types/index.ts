export type User = {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
  lastSeen?: Date;
  isAI?: boolean;
};

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: MessageStatus;
  replyToId?: string;
  replyToMessage?: {
    id: string;
    text: string;
    senderId: string;
  };
};

export type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  typing?: boolean;
};

export type Theme = 'light' | 'dark';