import React from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/formatters';
import { Avatar } from '../ui/Avatar';
import { Check, CheckCheck } from 'lucide-react';
import { Chat, User } from '../../types';

interface ChatItemProps {
  chat: Chat;
  currentUser: User;
  isActive: boolean;
  onClick: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ 
  chat, 
  currentUser,
  isActive, 
  onClick 
}) => {
  const otherParticipant = chat.participants.find(
    participant => participant.id !== currentUser.id
  );

  if (!otherParticipant) return null;

  const { lastMessage } = chat;
  
  const messageStatusIcon = () => {
    if (!lastMessage || lastMessage.senderId !== currentUser.id) return null;
    
    switch (lastMessage.status) {
      case 'sending':
        return null;
      case 'sent':
        return <Check size={16} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={16} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={16} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      whileTap={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer flex items-center gap-3 ${
        isActive 
          ? 'bg-bg-secondary-light dark:bg-bg-secondary-dark' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <Avatar 
        src={otherParticipant.avatar} 
        alt={otherParticipant.name}
        online={otherParticipant.online} 
      />

      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium text-text-light-primary dark:text-text-dark-primary truncate">
            {otherParticipant.name}
          </h3>
          {lastMessage && (
            <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary whitespace-nowrap ml-2">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary truncate max-w-[180px]">
            {lastMessage 
              ? (lastMessage.senderId === currentUser.id ? 'You: ' : '') + lastMessage.text
              : 'New chat'}
          </p>
          <div className="flex items-center">
            {messageStatusIcon()}
            {chat.unreadCount > 0 && (
              <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};