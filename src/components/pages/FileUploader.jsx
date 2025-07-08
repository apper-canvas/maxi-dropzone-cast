import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFileUpload } from '@/hooks/useFileUpload';
import Header from '@/components/organisms/Header';
import DropZone from '@/components/organisms/DropZone';
import FileList from '@/components/organisms/FileList';
import UploadSummary from '@/components/organisms/UploadSummary';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const FileUploader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    files,
    isUploading,
    uploadStats,
    uploadConfig,
    addFiles,
    removeFile,
    uploadFiles,
    clearCompleted,
    clearAll
  } = useFileUpload({
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [], // All file types allowed
    concurrent: 3
  });

  const handleFileSelect = async (fileList) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await addFiles(fileList);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    // Implement retry logic if needed
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Upload Instructions */}
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Upload Your Files
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Drag and drop files anywhere or click to browse. 
              Maximum file size: {(uploadConfig.maxFileSize / (1024 * 1024)).toFixed(0)}MB
            </p>
          </div>

          {/* Drop Zone */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <DropZone
              onFileSelect={handleFileSelect}
              accept={uploadConfig.allowedTypes.join(',')}
              disabled={isUploading}
            />
          </div>

          {/* Upload Summary */}
          <UploadSummary
            files={files}
            uploadStats={uploadStats}
            isUploading={isUploading}
            onUpload={uploadFiles}
            onClearCompleted={clearCompleted}
            onClearAll={clearAll}
          />

          {/* File List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <FileList
              files={files}
              onRemoveFile={removeFile}
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default FileUploader;