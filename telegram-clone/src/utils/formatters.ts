export const formatTime = (value: Date | string | number): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (value: Date | string | number): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (messageDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

export const formatLastSeen = (
  value: Date | string | number | undefined
): string => {
  if (value == null) {
    return 'last seen recently';
  }

  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    return 'last seen recently';
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'last seen just now';
  } else if (minutes < 60) {
    return `last seen ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hours < 24) {
    return `last seen ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `last seen ${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
};
