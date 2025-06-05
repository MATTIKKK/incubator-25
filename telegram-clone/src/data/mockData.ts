import { Chat, User } from '../types';
import { generateId } from '../utils/generateId';

export const currentUser: User = {
  id: 'current-user',
  name: 'You',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
};

export const aiUsers: User[] = [
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    avatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAI: true,
    online: true,
  },
  {
    id: 'ai-bot',
    name: 'ChatBot',
    avatar: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    isAI: true,
    online: true,
  },
];

export const humanUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alice Smith',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    online: true,
  },
  {
    id: 'user-2',
    name: 'Bob Johnson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    online: false,
    lastSeen: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    online: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 'user-4',
    name: 'Diana Prince',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    online: true,
  },
];

export const initialChats: Chat[] = [
  {
    id: 'chat-ai-1',
    participants: [currentUser, aiUsers[0]],
    messages: [
      {
        id: generateId(),
        chatId: 'chat-ai-1',
        senderId: aiUsers[0].id,
        text: 'Hello! I am your AI assistant. How can I help you today?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'read',
      },
    ],
    lastMessage: {
      id: generateId(),
      chatId: 'chat-ai-1',
      senderId: aiUsers[0].id,
      text: 'Hello! I am your AI assistant. How can I help you today?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'read',
    },
    unreadCount: 0,
  },
  {
    id: 'chat-1',
    participants: [currentUser, humanUsers[0]],
    messages: [
      {
        id: generateId(),
        chatId: 'chat-1',
        senderId: humanUsers[0].id,
        text: 'Hi there! How are you doing?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: 'read',
      },
      {
        id: generateId(),
        chatId: 'chat-1',
        senderId: currentUser.id,
        text: 'Hey Alice! I\'m doing great, thanks for asking. How about you?',
        timestamp: new Date(Date.now() - 55 * 60 * 1000),
        status: 'read',
      },
      {
        id: generateId(),
        chatId: 'chat-1',
        senderId: humanUsers[0].id,
        text: 'Pretty good! Just working on some new projects. Want to catch up later this week?',
        timestamp: new Date(Date.now() - 50 * 60 * 1000),
        status: 'read',
      },
    ],
    lastMessage: {
      id: generateId(),
      chatId: 'chat-1',
      senderId: humanUsers[0].id,
      text: 'Pretty good! Just working on some new projects. Want to catch up later this week?',
      timestamp: new Date(Date.now() - 50 * 60 * 1000),
      status: 'read',
    },
    unreadCount: 0,
  },
  {
    id: 'chat-2',
    participants: [currentUser, humanUsers[1]],
    messages: [
      {
        id: generateId(),
        chatId: 'chat-2',
        senderId: currentUser.id,
        text: 'Hey Bob, did you get the files I sent yesterday?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'delivered',
      },
    ],
    lastMessage: {
      id: generateId(),
      chatId: 'chat-2',
      senderId: currentUser.id,
      text: 'Hey Bob, did you get the files I sent yesterday?',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'delivered',
    },
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    participants: [currentUser, humanUsers[2]],
    messages: [
      {
        id: generateId(),
        chatId: 'chat-3',
        senderId: humanUsers[2].id,
        text: 'Check out this cool website I found!',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'read',
      },
      {
        id: generateId(),
        chatId: 'chat-3',
        senderId: humanUsers[2].id,
        text: 'Also, are we still meeting next Tuesday?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: 'delivered',
      },
    ],
    lastMessage: {
      id: generateId(),
      chatId: 'chat-3',
      senderId: humanUsers[2].id,
      text: 'Also, are we still meeting next Tuesday?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'delivered',
    },
    unreadCount: 2,
  },
];