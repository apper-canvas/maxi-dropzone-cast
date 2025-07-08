import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Upload" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-gray-900">
                DropZone
              </h1>
              <p className="text-xs text-gray-500">File Upload Tool</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="Shield" size={16} />
              <span>Secure Upload</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="Zap" size={16} />
              <span>Fast Processing</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;