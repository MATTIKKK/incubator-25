import React from 'react';
import { useChat } from '../../context/ChatContext';
import { formatMessageTime } from '../../utils/dateUtils';
import { User as UserIcon, CheckCheck } from 'lucide-react';

interface ChatListProps {
  onChatSelect: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const { chats, setActiveChat, currentUser } = useChat();

  const handleChatSelect = (chatId: string) => {
    const selectedChat = chats.find(chat => chat.id === chatId);
    if (selectedChat) {
      setActiveChat(selectedChat);
      onChatSelect();
    }
  };

  const getOtherParticipant = (chat: any) => {
    return chat.participants.find((p: any) => p.id !== currentUser.id);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h1 className="text-xl font-semibold text-[#2AABEE]">Chats</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No chats yet. Start a conversation!
          </div>
        ) : (
          chats.map(chat => {
            const otherParticipant = getOtherParticipant(chat);
            const lastMessage = chat.lastMessage;
            const isLastMessageFromMe = lastMessage?.senderId === currentUser.id;
            
            return (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <div className="relative">
                    {otherParticipant.avatar ? (
                      <img 
                        src={otherParticipant.avatar} 
                        alt={otherParticipant.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <UserIcon size={24} className="text-gray-500" />
                      </div>
                    )}
                    {otherParticipant.isOnline && (
                      <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-900 truncate">{otherParticipant.name}</h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatMessageTime(lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    
                    {lastMessage && (
                      <div className="flex items-center mt-1">
                        {isLastMessageFromMe && (
                          <CheckCheck size={14} className="text-[#2AABEE] mr-1" />
                        )}
                        <p className="text-sm text-gray-600 truncate">
                          {isLastMessageFromMe ? 'You: ' : ''}{lastMessage.text}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;