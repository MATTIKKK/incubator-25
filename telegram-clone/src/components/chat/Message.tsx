import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Reply } from 'lucide-react';
import { Message as MessageType, User } from '../../types';
import { formatTime } from '../../utils/formatters';
import { Button } from '../ui/Button';

interface MessageProps {
  message: MessageType;
  isOwn: boolean;
  onReply: (message: MessageType) => void;
  users: User[];
}

export const Message: React.FC<MessageProps> = ({ message, isOwn, onReply, users }) => {
  const statusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <span className="text-xs opacity-70">sending...</span>;
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={14} className="text-primary" />;
      default:
        return null;
    }
  };

  const getSenderName = (senderId: string) => {
    const user = users.find(u => u.id === senderId);
    return user?.name || 'Unknown User';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 group`}
    >
      <div 
        className={`relative px-3 py-2 rounded-lg max-w-xs sm:max-w-md break-words ${
          isOwn 
            ? 'bg-message-out-light dark:bg-message-out-dark text-text-light-primary dark:text-text-dark-primary rounded-br-none mr-2'
            : 'bg-message-in-light dark:bg-message-in-dark rounded-bl-none ml-2 shadow-message'
        }`}
      >
        {message.replyToMessage && (
          <div className="mb-2 pt-2 px-2 border-l-2 border-primary text-sm opacity-75">
            <div className="font-medium text-primary">
              {getSenderName(message.replyToMessage.senderId)}
            </div>
            <div className="truncate">{message.replyToMessage.text}</div>
          </div>
        )}
        
        <div className="text-sm">
          {message.text}
        </div>
        
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
            {formatTime(message.timestamp)}
          </span>
          {isOwn && statusIcon()}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-1/2 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity`}
          onClick={() => onReply(message)}
          aria-label="Reply to message"
        >
          <Reply size={16} />
        </Button>
      </div>
    </motion.div>
  );
};