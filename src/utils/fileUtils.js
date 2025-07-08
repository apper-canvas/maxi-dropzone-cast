export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidFileType = (file, allowedTypes) => {
  if (!allowedTypes || allowedTypes.length === 0) return true;
  
  return allowedTypes.some(type => {
    if (type.startsWith('.')) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    }
    return file.type.startsWith(type);
  });
};

export const isValidFileSize = (file, maxSize) => {
  if (!maxSize) return true;
  return file.size <= maxSize;
};

export const generateFilePreview = (file) => {
  return new Promise((resolve) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
};

export const createFileItem = async (file) => {
  const preview = await generateFilePreview(file);
  
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: file.name,
    size: file.size,
    type: file.type,
    status: 'pending',
    progress: 0,
    uploadedAt: null,
    preview,
    file
  };
};