export interface User {
  id: string;
  username: string;
  avatar?: string;
  status?: 'online' | 'offline';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  chatId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'video' | 'file';
    url: string;
    name?: string;
  }[];
}

export interface Chat {
  id: string;
  type: 'private' | 'group';
  participants: User[];
  lastMessage?: Message;
  unreadCount?: number;
  name?: string; // For group chats
  avatar?: string;
}

export interface ChatResponse {
  chats: Chat[];
  totalCount: number;
  hasMore: boolean;
}
