import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileCard from '@/components/organisms/FileCard';
import Empty from '@/components/ui/Empty';

const FileList = ({ files, onRemoveFile, onRetryUpload }) => {
  if (files.length === 0) {
    return (
      <Empty
        title="No files selected"
        description="Upload files using the drop zone above to see them here"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-gray-800">
          Files ({files.length})
        </h3>
      </div>
      
      <AnimatePresence mode="popLayout">
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <FileCard
              file={file}
              onRemove={() => onRemoveFile(file.id)}
              onRetry={onRetryUpload ? () => onRetryUpload(file.id) : undefined}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileList;