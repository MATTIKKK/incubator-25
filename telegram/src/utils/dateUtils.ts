import { formatDistanceToNow, format } from 'date-fns';

export const formatDistanceToNowStrict = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return format(date, 'HH:mm');
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  if (isYesterday) {
    return 'Yesterday';
  }
  
  const isThisWeek = now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000;
  if (isThisWeek) {
    return format(date, 'EEEE');
  }
  
  return format(date, 'dd/MM/yyyy');
};

export const formatLastSeen = (timestamp: string): string => {
  const date = new Date(timestamp);
  return `last seen ${formatDistanceToNow(date, { addSuffix: true })}`;
};