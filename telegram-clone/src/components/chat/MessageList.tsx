import React, { useRef, useEffect, useState } from 'react';
import { Message } from './Message';
import { Message as MessageType, User } from '../../types';
import { formatDate } from '../../utils/formatters';
import { Search } from '../ui/Search';

interface MessageListProps {
  messages: MessageType[];
  currentUser: User;
  onReply: (message: MessageType) => void;
  users: User[];
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUser,
  onReply,
  users
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(messages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = messages.filter(message => 
        message.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(messages);
    }
  }, [searchQuery, messages]);

  // Group messages by date
  const messagesByDate: Record<string, MessageType[]> = {};
  filteredMessages.forEach(message => {
    const dateStr = formatDate(message.timestamp);
    if (!messagesByDate[dateStr]) {
      messagesByDate[dateStr] = [];
    }
    messagesByDate[dateStr].push(message);
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b border-border-light dark:border-border-dark">
        <Search 
          onSearch={setSearchQuery} 
          placeholder="Search in conversation..."
        />
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {Object.entries(messagesByDate).map(([date, msgs]) => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-text-light-secondary dark:text-text-dark-secondary rounded-full">
                {date}
              </span>
            </div>
            {msgs.map(message => (
              <Message
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUser.id}
                onReply={onReply}
                users={users}
              />
            ))}
          </div>
        ))}
        
        {filteredMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            {searchQuery ? (
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">
                No messages found matching your search
              </p>
            ) : (
              <>
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm mb-2">
                  No messages yet
                </p>
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">
                  Send a message to start the conversation
                </p>
              </>
            )}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};