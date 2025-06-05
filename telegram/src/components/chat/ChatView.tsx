import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { formatMessageTime, formatLastSeen } from '../../utils/dateUtils';
import { ArrowLeft, Send, User as UserIcon } from 'lucide-react';

interface ChatViewProps {
  onBack: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ onBack }) => {
  const { activeChat, sendMessage, currentUser } = useChat();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }
  
  const otherParticipant = activeChat.participants.find(p => p.id !== currentUser.id)!;
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(activeChat.id, messageText);
      setMessageText('');
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat header */}
      <div className="p-3 border-b bg-white flex items-center sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="mr-2 p-2 rounded-full hover:bg-gray-100 md:hidden"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="relative">
          {otherParticipant.avatar ? (
            <img 
              src={otherParticipant.avatar} 
              alt={otherParticipant.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon size={20} className="text-gray-500" />
            </div>
          )}
          {otherParticipant.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <h2 className="font-medium">{otherParticipant.name}</h2>
          <p className="text-xs text-gray-500">
            {otherParticipant.isOnline ? 'online' : formatLastSeen(otherParticipant.lastSeen)}
          </p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {activeChat.messages.map(message => {
            const isFromMe = message.senderId === currentUser.id;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    isFromMe 
                      ? 'bg-[#2AABEE] text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{message.text}</p>
                  <div className={`text-xs mt-1 flex justify-end ${isFromMe ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatMessageTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="border-t bg-white p-3">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#2AABEE] focus:border-transparent"
          />
          <button 
            type="submit"
            disabled={!messageText.trim()}
            className="ml-2 p-2 bg-[#2AABEE] text-white rounded-full disabled:opacity-50 transition-opacity"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;