// Utility functions for the game

export const generateRandomColor = (): string => {
  const colors = [
    '#3B82F6', // blue
    '#EF4444', // red
    '#10B981', // green
    '#F59E0B', // yellow
    '#8B5CF6', // purple
    '#F97316', // orange
    '#06B6D4', // cyan
    '#84CC16', // lime
    '#EC4899', // pink
    '#6366F1', // indigo
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateRandomPosition = (
  fieldWidth: number, 
  fieldHeight: number, 
  playerSize: number
) => {
  const padding = 20;
  const x = Math.random() * (fieldWidth - playerSize - padding * 2) + padding;
  const y = Math.random() * (fieldHeight - playerSize - padding * 2) + padding;
  
  return { x: Math.floor(x), y: Math.floor(y) };
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 1 && name.trim().length <= 20;
};

export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};