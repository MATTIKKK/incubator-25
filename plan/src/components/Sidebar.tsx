import React from 'react';
import { Calendar, Clock, Settings, BarChart3 } from 'lucide-react';

interface SidebarProps {
  currentView: 'today' | 'calendar';
  setCurrentView: (view: 'today' | 'calendar') => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, onClose }) => {
  const menuItems = [
    { id: 'today', label: 'Today', icon: Clock, view: 'today' as const },
    { id: 'calendar', label: 'Calendar', icon: Calendar, view: 'calendar' as const },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, view: 'today' as const },
    { id: 'settings', label: 'Settings', icon: Settings, view: 'today' as const },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:fixed top-0 left-0 h-full w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Schedule AI
            </h1>
            <p className="text-gray-500 text-sm mt-2">Your intelligent assistant</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.view) setCurrentView(item.view);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${currentView === item.view 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <item.icon 
                  size={20} 
                  className={`transition-transform group-hover:scale-110 ${
                    currentView === item.view ? 'text-white' : ''
                  }`} 
                />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-12 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <h3 className="font-semibold text-gray-800 mb-4">Today's Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Tasks</span>
                <span className="font-semibold text-blue-600">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Meetings</span>
                <span className="font-semibold text-purple-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Free Time</span>
                <span className="font-semibold text-green-600">4h</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;