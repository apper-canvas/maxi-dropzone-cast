import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const UploadSummary = ({ 
  files, 
  uploadStats, 
  isUploading, 
  onUpload, 
  onClearCompleted, 
  onClearAll 
}) => {
  const pendingFiles = files.filter(f => f.status === 'pending');
  const completedFiles = files.filter(f => f.status === 'complete');
  const errorFiles = files.filter(f => f.status === 'error');
  const uploadingFiles = files.filter(f => f.status === 'uploading');

  const totalFiles = files.length;
  const hasPendingFiles = pendingFiles.length > 0;
  const hasCompletedFiles = completedFiles.length > 0;
  const hasFiles = totalFiles > 0;

  if (!hasFiles) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-gray-800">
          Upload Summary
        </h3>
        
        <div className="flex items-center gap-2">
          {hasCompletedFiles && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCompleted}
              className="text-gray-600 hover:text-gray-800"
            >
              <ApperIcon name="Check" size={16} />
              Clear Completed
            </Button>
          )}
          
          {hasFiles && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-gray-600 hover:text-gray-800"
            >
              <ApperIcon name="Trash2" size={16} />
              Clear All
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{totalFiles}</div>
          <div className="text-sm text-gray-600">Total Files</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{pendingFiles.length}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{completedFiles.length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{errorFiles.length}</div>
          <div className="text-sm text-gray-600">Failed</div>
        </div>
      </div>
      
      {isUploading && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Uploading files...</span>
            <span className="text-sm font-medium text-primary">
              {uploadingFiles.length} active
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${uploadStats.total > 0 ? (uploadStats.completed / uploadStats.total) * 100 : 0}%` 
              }}
            />
          </div>
        </div>
      )}
      
      {hasPendingFiles && (
        <div className="flex justify-center">
          <Button
            variant="accent"
            size="lg"
            onClick={onUpload}
            disabled={isUploading}
            className="px-8"
          >
            {isUploading ? (
              <>
                <ApperIcon name="Loader" size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <ApperIcon name="Upload" size={18} />
                Upload {pendingFiles.length} File{pendingFiles.length > 1 ? 's' : ''}
              </>
            )}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default UploadSummary;