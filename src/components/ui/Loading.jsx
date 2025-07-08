import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin mx-auto" 
               style={{ animationDelay: '0.3s', animationDirection: 'reverse' }}></div>
        </div>
        <h2 className="text-xl font-display font-semibold text-gray-800 mb-2">Loading DropZone</h2>
        <p className="text-gray-600">Preparing your file upload experience...</p>
      </motion.div>
    </div>
  );
};

export default Loading;