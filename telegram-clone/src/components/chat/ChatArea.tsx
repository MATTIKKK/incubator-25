import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { motion } from 'framer-motion';
import { Message } from '../../types';

export const ChatArea: React.FC = () => {
  const { currentChat, currentUser, sendMessage, typing, chats } = useChat();
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);

  if (!currentChat) {
    return (
      <div className="flex-grow flex items-center justify-center bg-bg-light dark:bg-bg-dark">
        <div className="text-center p-5">
          <h3 className="text-xl text-text-light-secondary dark:text-text-dark-secondary mb-3">
            Select a chat to start messaging
          </h3>
          <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">
            Choose from your existing conversations or start a new one
          </p>
        </div>
      </div>
    );
  }

  const otherParticipant = currentChat.participants.find(
    p => p.id !== currentUser.id
  );

  if (!otherParticipant) return null;

  const handleSendMessage = (text: string, replyTo?: Message) => {
    sendMessage(text, replyTo);
    setReplyToMessage(null);
  };

  const handleReply = (message: Message) => {
    setReplyToMessage(message);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-bg-light dark:bg-bg-dark"
    >
      <ChatHeader participant={otherParticipant} />
      <MessageList 
        messages={currentChat.messages}
        currentUser={currentUser}
        onReply={handleReply}
        users={[...new Set(chats.flatMap(chat => chat.participants))]}
      />
      <MessageInput 
        onSendMessage={handleSendMessage}
        isTyping={typing}
        replyToMessage={replyToMessage}
        onCancelReply={() => setReplyToMessage(null)}
      />
    </motion.div>
  );
};