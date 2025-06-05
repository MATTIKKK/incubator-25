import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-bg-secondary-light dark:bg-bg-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700 text-text-light-primary dark:text-text-dark-primary',
    ghost: 'bg-transparent hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark text-text-light-primary dark:text-text-dark-primary',
    icon: 'bg-transparent hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark text-text-light-secondary dark:text-text-dark-secondary rounded-full p-2',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    variant !== 'icon' ? sizeClasses[size] : '',
    fullWidth ? 'w-full' : '',
    className
  ].join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};