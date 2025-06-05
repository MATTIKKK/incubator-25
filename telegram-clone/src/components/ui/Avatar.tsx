import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md',
  online
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
      {online !== undefined && (
        <span className={`absolute bottom-0 right-0 block rounded-full ${
          online ? 'bg-green-500' : 'bg-gray-400'
        } ring-2 ring-white dark:ring-bg-dark-dark w-3 h-3`}
        />
      )}
    </div>
  );
};