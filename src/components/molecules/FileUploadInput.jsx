import React, { useRef } from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const FileUploadInput = ({ onFileSelect, accept, multiple = true, disabled = false }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onFileSelect(files);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <Button
        variant="secondary"
        onClick={handleClick}
        disabled={disabled}
        className="inline-flex items-center gap-2"
      >
        <ApperIcon name="FolderOpen" size={18} />
        Browse Files
      </Button>
    </>
  );
};

export default FileUploadInput;