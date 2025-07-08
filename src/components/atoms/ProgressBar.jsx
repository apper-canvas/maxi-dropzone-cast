import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const ProgressBar = forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  showValue = true,
  size = 'md',
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div className={cn('bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
        <div 
          className="h-full rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-primary to-secondary"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-600">{Math.round(percentage)}%</span>
          <span className="text-xs text-gray-500">{value}/{max}</span>
        </div>
      )}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;