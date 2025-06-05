export interface User {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
}