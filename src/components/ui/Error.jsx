import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-md mx-auto p-8"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" size={32} className="text-red-600" />
        </div>
        
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h2>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="gradient-button inline-flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" size={18} />
            Try Again
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Error;