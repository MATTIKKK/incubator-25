import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { User } from '../../types';
import { formatLastSeen } from '../../utils/formatters';
import { useTheme } from '../../contexts/ThemeContext';

interface ChatHeaderProps {
  participant: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ participant }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center justify-between py-2 px-4 border-b border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark">
      <div className="flex items-center space-x-3">
        <Avatar 
          src={participant.avatar} 
          alt={participant.name}
          online={participant.online} 
        />
        <div>
          <h2 className="font-medium text-text-light-primary dark:text-text-dark-primary">
            {participant.name}
          </h2>
          <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
            {participant.online 
              ? 'online'
              : participant.lastSeen 
                ? formatLastSeen(participant.lastSeen)
                : 'offline'
            }
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="icon" aria-label="Call">
          <Phone size={18} />
        </Button>
        <Button variant="icon" aria-label="Video call">
          <Video size={18} />
        </Button>
        <Button 
          variant="icon" 
          onClick={toggleTheme} 
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
        <Button variant="icon" aria-label="More options">
          <MoreVertical size={18} />
        </Button>
      </div>
    </div>
  );
};