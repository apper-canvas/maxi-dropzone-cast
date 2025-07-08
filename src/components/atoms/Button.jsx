import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:brightness-110 focus:ring-primary/50 transform hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-surface text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-primary/50 hover:shadow-md',
    accent: 'bg-accent text-white hover:brightness-110 focus:ring-accent/50 transform hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl'
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;