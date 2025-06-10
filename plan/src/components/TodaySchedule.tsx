import React from 'react';
import { Clock, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { Task } from '../types';

const TodaySchedule: React.FC = () => {
  // Sample data
  const todayTasks: Task[] = [
    {
      id: '1',
      title: 'Meeting with Managers',
      description: 'Weekly team sync and project updates',
      startTime: '09:00',
      endTime: '10:00',
      date: new Date().toISOString().split('T')[0],
      priority: 'high',
      type: 'meeting',
      phoneNumber: '+1234567890'
    },
    {
      id: '2',
      title: 'Drawing Class',
      description: 'Weekly art lesson',
      startTime: '14:00',
      endTime: '15:30',
      date: new Date().toISOString().split('T')[0],
      priority: 'medium',
      type: 'recurring',
      recurring: { frequency: 'weekly' },
      phoneNumber: '+0987654321',
      attendanceTracking: { attended: 2, total: 4 }
    },
    {
      id: '3',
      title: 'Project Review',
      description: 'Review quarterly results',
      startTime: '16:00',
      endTime: '17:30',
      date: new Date().toISOString().split('T')[0],
      priority: 'high',
      type: 'work'
    },
    {
      id: '4',
      title: 'Gym Session',
      description: 'Personal training',
      startTime: '18:00',
      endTime: '19:00',
      date: new Date().toISOString().split('T')[0],
      priority: 'low',
      type: 'personal'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return '👥';
      case 'personal': return '🏃';
      case 'work': return '💼';
      case 'recurring': return '🔄';
      default: return '📝';
    }
  };

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Today's Schedule
        </h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            🤖
          </div>
          <h3 className="font-semibold">AI Insights</h3>
        </div>
        <p className="text-white/90">
          You have a busy day with 4 tasks. Your drawing class attendance is at 50% this month. 
          Consider rescheduling the gym session if the project review runs late.
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
          <Clock className="text-blue-500" size={24} />
          Timeline
        </h2>

        <div className="space-y-4">
          {todayTasks.map((task, index) => {
            const taskStartHour = parseInt(task.startTime.split(':')[0]);
            const taskStartMinute = parseInt(task.startTime.split(':')[1]);
            const isCurrentOrPast = 
              taskStartHour < currentHour || 
              (taskStartHour === currentHour && taskStartMinute <= currentMinute);

            return (
              <div
                key={task.id}
                className={`
                  relative p-6 rounded-xl border transition-all duration-300 hover:shadow-lg group cursor-pointer
                  ${isCurrentOrPast 
                    ? 'bg-gray-50 border-gray-200 opacity-75' 
                    : 'bg-white border-gray-100 hover:border-gray-200'
                  }
                `}
              >
                {/* Priority indicator */}
                <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${getPriorityColor(task.priority)} rounded-l-xl`} />

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(task.type)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {task.startTime} - {task.endTime}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(task.priority)} text-white`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-gray-600 mb-3">{task.description}</p>
                    )}

                    {/* Special indicators */}
                    <div className="flex items-center gap-4">
                      {task.phoneNumber && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Phone size={12} />
                          <span>Auto-notify available</span>
                        </div>
                      )}

                      {task.attendanceTracking && (
                        <div className="flex items-center gap-1 text-xs">
                          {task.attendanceTracking.attended / task.attendanceTracking.total < 0.5 ? (
                            <>
                              <AlertCircle size={12} className="text-red-500" />
                              <span className="text-red-600">
                                Low attendance ({task.attendanceTracking.attended}/{task.attendanceTracking.total})
                              </span>
                            </>
                          ) : (
                            <>
                              <CheckCircle size={12} className="text-green-500" />
                              <span className="text-green-600">
                                Good attendance ({task.attendanceTracking.attended}/{task.attendanceTracking.total})
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {isCurrentOrPast && (
                    <div className="text-gray-400">
                      <CheckCircle size={20} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Free time blocks */}
        <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
          <h4 className="font-medium text-green-800 mb-2">Free Time Blocks</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">10:00 - 14:00</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">15:30 - 16:00</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">19:00 - 22:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaySchedule;