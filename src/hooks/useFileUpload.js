import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { createFileItem, isValidFileType, isValidFileSize } from '@/utils/fileUtils';

const DEFAULT_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [],
  concurrent: 3
};

export const useFileUpload = (config = DEFAULT_CONFIG) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStats, setUploadStats] = useState({
    total: 0,
    completed: 0,
    failed: 0
  });

  const uploadConfig = { ...DEFAULT_CONFIG, ...config };

  const validateFile = useCallback((file) => {
    if (!isValidFileSize(file, uploadConfig.maxFileSize)) {
      return `File size exceeds maximum limit of ${(uploadConfig.maxFileSize / (1024 * 1024)).toFixed(1)}MB`;
    }
    
    if (!isValidFileType(file, uploadConfig.allowedTypes)) {
      return `File type not supported. Allowed types: ${uploadConfig.allowedTypes.join(', ')}`;
    }
    
    return null;
  }, [uploadConfig]);

  const addFiles = useCallback(async (fileList) => {
    const newFiles = [];
    
    for (const file of fileList) {
      const existingFile = files.find(f => f.name === file.name && f.size === file.size);
      if (existingFile) {
        toast.warning(`File "${file.name}" is already in the queue`);
        continue;
      }
      
      const error = validateFile(file);
      if (error) {
        toast.error(`${file.name}: ${error}`);
        continue;
      }
      
      const fileItem = await createFileItem(file);
      newFiles.push(fileItem);
    }
    
    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`Added ${newFiles.length} file${newFiles.length > 1 ? 's' : ''} to upload queue`);
    }
  }, [files, validateFile]);

  const removeFile = useCallback((fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const updateFileProgress = useCallback((fileId, progress) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, progress } : f
    ));
  }, []);

  const updateFileStatus = useCallback((fileId, status, uploadedAt = null) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status, uploadedAt } : f
    ));
  }, []);

  const simulateUpload = useCallback(async (file) => {
    updateFileStatus(file.id, 'uploading');
    
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
        updateFileProgress(file.id, progress);
      }
      
      // Simulate potential failure (5% chance)
      if (Math.random() < 0.05) {
        throw new Error('Upload failed');
      }
      
      updateFileStatus(file.id, 'complete', new Date());
      return true;
    } catch (error) {
      updateFileStatus(file.id, 'error');
      return false;
    }
  }, [updateFileStatus, updateFileProgress]);

  const uploadFiles = useCallback(async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    if (pendingFiles.length === 0) {
      toast.warning('No files to upload');
      return;
    }
    
    setIsUploading(true);
    setUploadStats({ total: pendingFiles.length, completed: 0, failed: 0 });
    
    const uploadPromises = pendingFiles.map(file => simulateUpload(file));
    
    try {
      const results = await Promise.all(uploadPromises);
      const completed = results.filter(Boolean).length;
      const failed = results.length - completed;
      
      setUploadStats({ total: pendingFiles.length, completed, failed });
      
      if (failed === 0) {
        toast.success(`Successfully uploaded ${completed} file${completed > 1 ? 's' : ''}!`);
      } else {
        toast.warning(`Upload completed: ${completed} successful, ${failed} failed`);
      }
    } catch (error) {
      toast.error('Upload process failed');
    } finally {
      setIsUploading(false);
    }
  }, [files, simulateUpload]);

  const clearCompleted = useCallback(() => {
    setFiles(prev => prev.filter(f => f.status !== 'complete'));
    toast.info('Cleared completed uploads');
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setUploadStats({ total: 0, completed: 0, failed: 0 });
    toast.info('Cleared all files');
  }, []);

  return {
    files,
    isUploading,
    uploadStats,
    uploadConfig,
    addFiles,
    removeFile,
    uploadFiles,
    clearCompleted,
    clearAll
  };
};