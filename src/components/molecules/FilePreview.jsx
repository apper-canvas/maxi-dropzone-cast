import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const FilePreview = ({ file, className = '' }) => {
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.startsWith('video/')) return 'Video';
    if (type.startsWith('audio/')) return 'Music';
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('word') || type.includes('document')) return 'FileText';
    if (type.includes('sheet') || type.includes('excel')) return 'FileSpreadsheet';
    if (type.includes('presentation') || type.includes('powerpoint')) return 'Presentation';
    if (type.includes('zip') || type.includes('archive')) return 'Archive';
    return 'File';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`relative w-16 h-16 ${className}`}
    >
      {file.preview ? (
        <div className="w-full h-full rounded-lg overflow-hidden border-2 border-gray-200">
          <img
            src={file.preview}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-200">
          <ApperIcon 
            name={getFileIcon(file.type)} 
            size={24} 
            className="text-gray-500" 
          />
        </div>
      )}
    </motion.div>
  );
};

export default FilePreview;