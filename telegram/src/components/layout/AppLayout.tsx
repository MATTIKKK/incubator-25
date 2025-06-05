import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { Menu, MessageCircle, User as UserIcon } from 'lucide-react';
import ChatList from '../chat/ChatList';
import ChatView from '../chat/ChatView';
import Profile from '../profile/Profile';

type View = 'chats' | 'chat' | 'profile';

const AppLayout: React.FC = () => {
  const { activeChat } = useChat();
  const [view, setView] = useState<View>('chats');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (newView: View) => {
    setView(newView);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-10 px-4 py-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#2AABEE]">TeleClone</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-2 flex justify-around">
            <button
              onClick={() => handleNavigation('chats')}
              className={`p-2 rounded-full ${view === 'chats' ? 'bg-[#2AABEE] text-white' : 'text-gray-700'}`}
            >
              <MessageCircle size={20} />
            </button>
            <button
              onClick={() => handleNavigation('profile')}
              className={`p-2 rounded-full ${view === 'profile' ? 'bg-[#2AABEE] text-white' : 'text-gray-700'}`}
            >
              <UserIcon size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-16 bg-[#2AABEE] h-full items-center py-6">
        <button
          onClick={() => setView('chats')}
          className={`p-3 rounded-full mb-4 ${view === 'chats' || view === 'chat' ? 'bg-white text-[#2AABEE]' : 'text-white hover:bg-[#1D9CD9]'}`}
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={() => setView('profile')}
          className={`p-3 rounded-full ${view === 'profile' ? 'bg-white text-[#2AABEE]' : 'text-white hover:bg-[#1D9CD9]'}`}
        >
          <UserIcon size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 md:pt-0 pt-12 h-full overflow-hidden">
        {view !== 'profile' && (
          <div className={`${view === 'chat' ? 'hidden md:block' : 'block'} w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto`}>
            <ChatList onChatSelect={() => setView('chat')} />
          </div>
        )}

        {view === 'profile' && (
          <div className="flex-1 overflow-y-auto">
            <Profile onBack={() => setView('chats')} />
          </div>
        )}

        {view === 'chat' && (
          <div className="flex-1 overflow-hidden">
            <ChatView onBack={() => setView('chats')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLayout;