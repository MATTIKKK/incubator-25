import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import DailyView from './DailyView';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDailyView, setShowDailyView] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowDailyView(true);
  };

  const handleBackToCalendar = () => {
    setShowDailyView(false);
    setSelectedDate(null);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const hasEvents = Math.random() > 0.7; // Simulate events

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(date)}
          className={`
            h-24 p-2 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-blue-50 group hover:shadow-md
            ${isToday ? 'bg-blue-100 border-blue-300' : ''}
            ${isSelected ? 'bg-blue-200 border-blue-400' : ''}
          `}
        >
          <div className={`
            text-sm font-medium mb-1 transition-colors
            ${isToday ? 'text-blue-600' : 'text-gray-700'}
            group-hover:text-blue-600
          `}>
            {day}
          </div>
          {hasEvents && (
            <div className="space-y-1">
              <div className="h-1 bg-purple-400 rounded-full w-3/4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="h-1 bg-green-400 rounded-full w-1/2 opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
          <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
            Click to view
          </div>
        </div>
      );
    }

    return days;
  };

  const getSelectedDateTasks = () => {
    if (!selectedDate) return [];
    
    // Sample tasks for selected date
    return [
      {
        id: '1',
        title: 'Team Meeting',
        time: '09:00 - 10:00',
        priority: 'high',
        type: 'meeting'
      },
      {
        id: '2',
        title: 'Lunch with Client',
        time: '12:30 - 14:00',
        priority: 'medium',
        type: 'personal'
      }
    ];
  };

  // Show daily view if a date is selected
  if (showDailyView && selectedDate) {
    return <DailyView selectedDate={selectedDate} onBack={handleBackToCalendar} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Calendar</h1>
          <p className="text-gray-600 mt-2">Manage your schedule • Click any date to view details</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h2 className="text-xl font-semibold text-gray-800 min-w-48 text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Quick Add */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Add</h3>
            <button className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300">
              <Plus size={20} />
              New Event
            </button>
          </div>

          {/* Selected Date Details */}
          {selectedDate && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              <div className="space-y-3">
                {getSelectedDateTasks().length > 0 ? (
                  getSelectedDateTasks().map(task => (
                    <div key={task.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="font-medium text-gray-800">{task.title}</div>
                      <div className="text-sm text-gray-600">{task.time}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No events scheduled</p>
                )}
              </div>
              
              <button
                onClick={() => handleDateClick(selectedDate)}
                className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                View Detailed Schedule
              </button>
            </div>
          )}

          {/* This Month Stats */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Events</span>
                <span className="font-semibold">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meetings</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Free Days</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-semibold text-green-600">87%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;