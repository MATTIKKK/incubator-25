export interface Task {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  type: 'meeting' | 'personal' | 'work' | 'recurring';
  recurring?: {
    frequency: 'weekly' | 'monthly';
    endDate?: string;
  };
  phoneNumber?: string;
  attendanceTracking?: {
    attended: number;
    total: number;
  };
  completed?: boolean;
}

export interface ConversationMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface ConversationStyle {
  id: string;
  name: string;
  personality: string;
  icon: string;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}