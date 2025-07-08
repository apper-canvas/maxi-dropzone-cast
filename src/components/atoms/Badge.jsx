import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Badge = forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'md',
  children,
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-all duration-200';
  
  const variants = {
    default: 'bg-gray-100 text-gray-600',
    pending: 'bg-gray-100 text-gray-600',
    uploading: 'bg-blue-100 text-blue-600',
    complete: 'bg-green-100 text-green-600',
    error: 'bg-red-100 text-red-600',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;