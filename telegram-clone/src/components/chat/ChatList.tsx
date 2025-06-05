import React, { useState } from 'react';
import { Search } from '../ui/Search';
import { ChatItem } from './ChatItem';
import { Button } from '../ui/Button';
import { Plus, Users, Bot } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import { humanUsers, aiUsers } from '../../data/mockData';

export const ChatList: React.FC = () => {
  const { chats, currentChat, currentUser, setCurrentChat, searchChats, createNewChat } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChatMenu, setShowNewChatMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'people' | 'ai'>('all');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const filteredChats = searchQuery ? searchChats(searchQuery) : chats;
  
  const displayedChats = filteredChats.filter(chat => {
    if (activeTab === 'all') return true;
    if (activeTab === 'people') return !chat.participants.some(p => p.isAI);
    if (activeTab === 'ai') return chat.participants.some(p => p.isAI);
    return true;
  });

  const toggleNewChatMenu = () => {
    setShowNewChatMenu(!showNewChatMenu);
  };

  const handleCreateChat = (userId: string) => {
    createNewChat(userId);
    setShowNewChatMenu(false);
  };

  const categoryStyle = (isActive: boolean) => 
    `px-4 py-2 text-sm font-medium ${
      isActive 
        ? 'text-primary border-b-2 border-primary' 
        : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary'
    }`;

  return (
    <div className="h-full flex flex-col bg-bg-light dark:bg-bg-dark border-r border-border-light dark:border-border-dark">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-text-light-primary dark:text-text-dark-primary">Chats</h1>
        <Button variant="icon" onClick={toggleNewChatMenu}>
          <Plus size={20} />
        </Button>
      </div>
      
      {/* New chat menu */}
      <AnimatePresence>
        {showNewChatMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-bg-light dark:bg-bg-dark px-4 pb-4 overflow-hidden"
          >
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-2">
              <h3 className="text-sm font-medium p-2 text-text-light-primary dark:text-text-dark-primary">New Chat</h3>
              
              <div className="mt-1 space-y-1">
                <h4 className="text-xs font-medium px-2 py-1 text-text-light-secondary dark:text-text-dark-secondary">AI Assistants</h4>
                {aiUsers.map(user => (
                  <div 
                    key={user.id}
                    onClick={() => handleCreateChat(user.id)}
                    className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-bg-light dark:hover:bg-bg-dark"
                  >
                    <Avatar src={user.avatar} alt={user.name} size="sm" online />
                    <span className="text-sm text-text-light-primary dark:text-text-dark-primary">{user.name}</span>
                  </div>
                ))}
              
                <h4 className="text-xs font-medium px-2 py-1 mt-2 text-text-light-secondary dark:text-text-dark-secondary">People</h4>
                {humanUsers.map(user => (
                  <div 
                    key={user.id}
                    onClick={() => handleCreateChat(user.id)}
                    className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-bg-light dark:hover:bg-bg-dark"
                  >
                    <Avatar src={user.avatar} alt={user.name} size="sm" online={user.online} />
                    <span className="text-sm text-text-light-primary dark:text-text-dark-primary">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="px-4 my-2">
        <Search onSearch={handleSearch} placeholder="Search messages or contacts" />
      </div>
      
      {/* Category tabs */}
      <div className="flex border-b border-border-light dark:border-border-dark">
        <button 
          className={categoryStyle(activeTab === 'all')} 
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={categoryStyle(activeTab === 'people')} 
          onClick={() => setActiveTab('people')}
        >
          <Users size={16} className="mr-1 inline" />
          People
        </button>
        <button 
          className={categoryStyle(activeTab === 'ai')} 
          onClick={() => setActiveTab('ai')}
        >
          <Bot size={16} className="mr-1 inline" />
          AI
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {displayedChats.length > 0 ? (
          displayedChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              currentUser={currentUser}
              isActive={currentChat?.id === chat.id}
              onClick={() => setCurrentChat(chat.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text-light-secondary dark:text-text-dark-secondary p-4 text-center">
            <span className="text-sm">No chats found</span>
            <Button 
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={toggleNewChatMenu}
            >
              Start a new chat
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Need to import Avatar
import { Avatar } from '../ui/Avatar';