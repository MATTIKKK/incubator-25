import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Phone, Repeat, AlertTriangle } from 'lucide-react';
import { Task } from '../types';

interface TaskModalProps {
  onClose: () => void;
  editingTask?: Task | null;
  selectedDate?: Date;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, editingTask, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    startTime: '',
    endTime: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    type: 'personal' as 'meeting' | 'personal' | 'work' | 'recurring',
    phoneNumber: '',
    isRecurring: false,
    recurringFrequency: 'weekly' as 'weekly' | 'monthly'
  });

  const [conflict, setConflict] = useState<boolean>(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        date: editingTask.date,
        startTime: editingTask.startTime,
        endTime: editingTask.endTime,
        priority: editingTask.priority,
        type: editingTask.type,
        phoneNumber: editingTask.phoneNumber || '',
        isRecurring: !!editingTask.recurring,
        recurringFrequency: editingTask.recurring?.frequency || 'weekly'
      });
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate conflict detection
    const hasConflict = Math.random() > 0.7;
    setConflict(hasConflict);
    
    if (!hasConflict) {
      // Here you would typically save the task
      console.log('Task saved:', formData);
      onClose();
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setConflict(false); // Reset conflict when form changes
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conflict Warning */}
        {conflict && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-red-500" size={20} />
              <h3 className="font-semibold text-red-800">Scheduling Conflict Detected!</h3>
            </div>
            <p className="text-red-700 text-sm mb-4">
              You already have "Project Review" scheduled from 16:00-17:30. Both tasks have high priority.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                Keep Original
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Reschedule to 18:00
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Choose Manually
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Meeting with managers"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Additional details..."
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline mr-1" size={16} />
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline mr-1" size={16} />
                Start Time *
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time *
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Priority and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="meeting">Meeting</option>
                <option value="recurring">Recurring</option>
              </select>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline mr-1" size={16} />
              Phone Number (for WhatsApp notifications)
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+1234567890"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Recurring Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.isRecurring}
                onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                className="w-4 h-4 text-blue-500 rounded"
              />
              <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                <Repeat className="inline mr-1" size={16} />
                Make this a recurring event
              </label>
            </div>
            
            {formData.isRecurring && (
              <div className="ml-7">
                <select
                  value={formData.recurringFrequency}
                  onChange={(e) => handleInputChange('recurringFrequency', e.target.value)}
                  className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}
          </div>

          {/* Priority Preview */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getPriorityColor(formData.priority)}`} />
              <span className="text-sm text-gray-600">
                This task will be marked as <strong>{formData.priority} priority</strong>
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;