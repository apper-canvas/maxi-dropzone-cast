import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import FileUploadInput from '@/components/molecules/FileUploadInput';

const DropZone = ({ onFileSelect, accept, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const dropZoneRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set drag active to false if we're leaving the drop zone entirely
    if (!dropZoneRef.current?.contains(e.relatedTarget)) {
      setIsDragActive(false);
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files);
    }
  }, [onFileSelect, disabled]);

  const dropZoneClasses = `
    drop-zone relative min-h-[300px] flex flex-col items-center justify-center
    ${isDragOver ? 'drag-over' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  return (
    <motion.div
      ref={dropZoneRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={dropZoneClasses}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: isDragOver ? 1.1 : 1,
            rotate: isDragOver ? 5 : 0
          }}
          transition={{ duration: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon 
            name="Upload" 
            size={40} 
            className={`transition-colors duration-200 ${isDragOver ? 'text-primary' : 'text-gray-400'}`}
          />
        </motion.div>
        
        <h3 className="text-xl font-display font-semibold text-gray-800 mb-2">
          {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {isDragOver ? 'Release to upload' : 'or click to browse from your computer'}
        </p>
        
        <FileUploadInput
          onFileSelect={onFileSelect}
          accept={accept}
          multiple={true}
          disabled={disabled}
        />
      </div>
      
      {isDragActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default DropZone;