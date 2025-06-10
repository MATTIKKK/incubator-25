import React, { useState } from 'react';
import { ArrowLeft, Clock, Edit, Trash2, Check, Plus, MoreVertical } from 'lucide-react';
import { Task } from '../types';
import ConfirmationModal from './ConfirmationModal';
import TaskModal from './TaskModal';

interface DailyViewProps {
  selectedDate: Date;
  onBack: () => void;
}

const DailyView: React.FC<DailyViewProps> = ({ selectedDate, onBack }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Morning Standup',
      description: 'Daily team sync',
      startTime: '09:00',
      endTime: '09:30',
      date: selectedDate.toISOString().split('T')[0],
      priority: 'medium',
      type: 'meeting',
      completed: false
    },
    {
      id: '2',
      title: 'Client Presentation',
      description: 'Q4 results presentation',
      startTime: '14:00',
      endTime: '15:30',
      date: selectedDate.toISOString().split('T')[0],
      priority: 'high',
      type: 'work',
      completed: false
    },
    {
      id: '3',
      title: 'Gym Session',
      description: 'Cardio and strength training',
      startTime: '18:00',
      endTime: '19:30',
      date: selectedDate.toISOString().split('T')[0],
      priority: 'low',
      type: 'personal',
      completed: true
    }
  ]);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'complete' | 'delete';
    taskId: string;
    taskTitle: string;
  }>({
    isOpen: false,
    type: 'complete',
    taskId: '',
    taskTitle: ''
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getTasksForHour = (hour: number) => {
    return tasks.filter(task => {
      const taskHour = parseInt(task.startTime.split(':')[0]);
      const taskEndHour = parseInt(task.endTime.split(':')[0]);
      const taskEndMinute = parseInt(task.endTime.split(':')[1]);
      
      return taskHour <= hour && (taskEndHour > hour || (taskEndHour === hour && taskEndMinute > 0));
    });
  };

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

  const handleCompleteTask = (taskId: string, taskTitle: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'complete',
      taskId,
      taskTitle
    });
  };

  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      taskId,
      taskTitle
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
    setActiveDropdown(null);
  };

  const confirmAction = () => {
    if (confirmModal.type === 'complete') {
      setTasks(prev => prev.map(task => 
        task.id === confirmModal.taskId 
          ? { ...task, completed: !task.completed }
          : task
      ));
    } else if (confirmModal.type === 'delete') {
      setTasks(prev => prev.filter(task => task.id !== confirmModal.taskId));
    }
    
    setConfirmModal({ isOpen: false, type: 'complete', taskId: '', taskTitle: '' });
  };

  const cancelAction = () => {
    setConfirmModal({ isOpen: false, type: 'complete', taskId: '', taskTitle: '' });
  };

  const formatHour = (hour: number) => {
    return hour.toString().padStart(2, '0') + ':00';
  };

  const currentHour = new Date().getHours();
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </h1>
            <p className="text-gray-600">Detailed hourly schedule</p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setShowTaskModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {/* Daily Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
          <div className="text-gray-600 text-sm">Total Tasks</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.completed).length}</div>
          <div className="text-gray-600 text-sm">Completed</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-red-600">{tasks.filter(t => t.priority === 'high').length}</div>
          <div className="text-gray-600 text-sm">High Priority</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) || 0}%
          </div>
          <div className="text-gray-600 text-sm">Progress</div>
        </div>
      </div>

      {/* Hourly Schedule */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Clock size={20} />
            Hourly Schedule
          </h2>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {hours.map(hour => {
            const hourTasks = getTasksForHour(hour);
            const isCurrentHour = isToday && hour === currentHour;
            
            return (
              <div
                key={hour}
                className={`
                  border-b border-gray-100 transition-colors
                  ${isCurrentHour ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
                `}
              >
                <div className="flex">
                  {/* Time column */}
                  <div className={`
                    w-20 p-4 text-center border-r border-gray-100 font-medium
                    ${isCurrentHour ? 'text-blue-600 bg-blue-100' : 'text-gray-600'}
                  `}>
                    {formatHour(hour)}
                  </div>

                  {/* Tasks column */}
                  <div className="flex-1 p-4">
                    {hourTasks.length > 0 ? (
                      <div className="space-y-2">
                        {hourTasks.map(task => (
                          <div
                            key={task.id}
                            className={`
                              relative p-3 rounded-lg border transition-all duration-200 group
                              ${task.completed 
                                ? 'bg-gray-50 border-gray-200 opacity-75' 
                                : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
                              }
                            `}
                          >
                            {/* Priority indicator */}
                            <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${getPriorityColor(task.priority)} rounded-l-lg`} />

                            <div className="flex items-center justify-between ml-3">
                              <div className="flex items-center gap-3 flex-1">
                                <span className="text-lg">{getTypeIcon(task.type)}</span>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                      {task.title}
                                    </h4>
                                    {task.completed && (
                                      <Check size={16} className="text-green-500" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>{task.startTime} - {task.endTime}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(task.priority)} text-white`}>
                                      {task.priority}
                                    </span>
                                  </div>
                                  {task.description && (
                                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                  )}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="relative">
                                <button
                                  onClick={() => setActiveDropdown(activeDropdown === task.id ? null : task.id)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <MoreVertical size={16} />
                                </button>

                                {activeDropdown === task.id && (
                                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
                                    <button
                                      onClick={() => {
                                        handleCompleteTask(task.id, task.title);
                                        setActiveDropdown(null);
                                      }}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                      <Check size={16} className="text-green-500" />
                                      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                    </button>
                                    <button
                                      onClick={() => handleEditTask(task)}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                      <Edit size={16} className="text-blue-500" />
                                      Edit Task
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDeleteTask(task.id, task.title);
                                        setActiveDropdown(null);
                                      }}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                                    >
                                      <Trash2 size={16} />
                                      Delete Task
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm italic">No tasks scheduled</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.type === 'complete' ? 'Confirm Task Status' : 'Delete Task'}
        message={
          confirmModal.type === 'complete'
            ? `Are you sure you want to ${tasks.find(t => t.id === confirmModal.taskId)?.completed ? 'mark as incomplete' : 'mark as complete'} "${confirmModal.taskTitle}"?`
            : `Are you sure you want to delete "${confirmModal.taskTitle}"? This action cannot be undone.`
        }
        confirmText={confirmModal.type === 'complete' ? 'Confirm' : 'Delete'}
        cancelText="Cancel"
        onConfirm={confirmAction}
        onCancel={cancelAction}
        type={confirmModal.type === 'delete' ? 'danger' : 'info'}
      />

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          editingTask={editingTask}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default DailyView;