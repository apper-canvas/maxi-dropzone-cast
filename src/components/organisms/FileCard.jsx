import React from 'react';
import { motion } from 'framer-motion';
import { formatFileSize } from '@/utils/fileUtils';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import ProgressBar from '@/components/atoms/ProgressBar';
import StatusIndicator from '@/components/molecules/StatusIndicator';
import FilePreview from '@/components/molecules/FilePreview';

const FileCard = ({ file, onRemove, onRetry }) => {
  const isUploading = file.status === 'uploading';
  const isComplete = file.status === 'complete';
  const isError = file.status === 'error';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="file-card"
    >
      <div className="flex items-start gap-4">
        <FilePreview file={file} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate" title={file.name}>
                {file.name}
              </h4>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)}
                {isComplete && file.uploadedAt && (
                  <span className="ml-2">
                    • Uploaded {format(file.uploadedAt, 'MMM d, yyyy h:mm a')}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <StatusIndicator status={file.status} />
              
              {isError && onRetry && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRetry}
                  className="text-primary hover:text-primary"
                >
                  <ApperIcon name="RefreshCw" size={16} />
                </Button>
              )}
              
              {!isUploading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                  className="text-red-500 hover:text-red-700"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              )}
            </div>
          </div>
          
          {isUploading && (
            <div className="mt-2">
              <ProgressBar 
                value={file.progress} 
                max={100} 
                showValue={true}
                size="md"
              />
            </div>
          )}
          
          {isError && (
            <div className="mt-2 text-sm text-red-600">
              Upload failed. Please try again.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FileCard;