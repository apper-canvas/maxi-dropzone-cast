import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No files uploaded yet", 
  description = "Drag and drop files here or click to browse",
  actionLabel = "Browse Files",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="Upload" size={40} className="text-primary" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="gradient-button inline-flex items-center gap-2"
        >
          <ApperIcon name="FolderOpen" size={18} />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;