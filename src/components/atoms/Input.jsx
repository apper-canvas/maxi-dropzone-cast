import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ 
  className, 
  type = 'text', 
  error = false,
  ...props 
}, ref) => {
  const baseStyles = 'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
  
  const errorStyles = 'border-red-300 focus:border-red-500 focus:ring-red-500/20';
  
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        baseStyles,
        error && errorStyles,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;