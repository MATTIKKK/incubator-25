import React from 'react';
import { ChatList } from '../chat/ChatList';
import { ChatArea } from '../chat/ChatArea';

export const Layout: React.FC = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-bg-light dark:bg-bg-dark text-text-light-primary dark:text-text-dark-primary">
      {/* Sidebar with chat list - hidden on mobile, shown on md screens */}
      <div className="hidden md:block md:w-80 lg:w-96 shrink-0">
        <ChatList />
      </div>
      
      {/* Mobile sidebar - shown on mobile, hidden on md screens */}
      <div className="fixed inset-y-0 left-0 z-40 w-full md:hidden">
        {/* This would be a sliding panel in a real app */}
        <div className="h-full w-80 transform transition-transform duration-300 ease-in-out">
          <ChatList />
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow flex flex-col">
        <ChatArea />
      </div>
    </div>
  );
};