import React, { useState } from 'react';
import { Calendar, MessageCircle, Plus, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import TodaySchedule from './TodaySchedule';
import CalendarView from './CalendarView';
import AIAssistant from './AIAssistant';
import TaskModal from './TaskModal';

type View = 'today' | 'calendar';

const Layout: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('today');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-80 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {currentView === 'today' ? <TodaySchedule /> : <CalendarView />}
          </div>
        </main>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        {/* AI Assistant Button */}
        <button
          onClick={() => setShowAIAssistant(true)}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Add Task Button */}
        <button
          onClick={() => setShowTaskModal(true)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        >
          <Plus size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Modals */}
      {showAIAssistant && (
        <AIAssistant onClose={() => setShowAIAssistant(false)} />
      )}

      {showTaskModal && (
        <TaskModal onClose={() => setShowTaskModal(false)} />
      )}
    </div>
  );
};

export default Layout;