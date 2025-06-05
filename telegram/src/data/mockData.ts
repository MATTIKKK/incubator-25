import { Chat, User, Message } from '../types';

// Mock current user
export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  lastSeen: new Date().toISOString(),
  isOnline: true,
};

// Mock contacts
export const contacts: User[] = [
  {
    id: 'user-2',
    name: 'Alice Smith',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    lastSeen: new Date().toISOString(),
    isOnline: true,
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    lastSeen: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    isOnline: false,
  },
  {
    id: 'user-4',
    name: 'Carol Williams',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300',
    lastSeen: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    isOnline: false,
  },
  {
    id: 'user-5',
    name: 'Dave Brown',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isOnline: false,
  },
];

// Generate mock messages
const generateMessages = (senderId: string, recipientId: string, count: number): Message[] => {
  const messages: Message[] = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const isEven = i % 2 === 0;
    messages.push({
      id: `msg-${senderId}-${recipientId}-${i}`,
      senderId: isEven ? senderId : recipientId,
      text: isEven 
        ? `This is message ${i + 1} from ${isEven ? 'you' : 'them'}.` 
        : `Reply to message ${i}.`,
      timestamp: new Date(now - (count - i) * 1000 * 60 * 5).toISOString(), // 5 minutes apart
      isRead: true,
    });
  }
  
  return messages;
};

// Mock chats
export const initialChats: Chat[] = contacts.map((contact, index) => {
  const messages = generateMessages(currentUser.id, contact.id, (index + 1) * 2);
  return {
    id: `chat-${contact.id}`,
    participants: [currentUser, contact],
    messages,
    lastMessage: messages[messages.length - 1],
  };
});