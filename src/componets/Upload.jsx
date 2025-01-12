import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ 
  onFileSelect, 
  accept = "image/svg+xml,image/png,image/jpeg",
  maxSize = 5242880, // 5MB default
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const validateFile = useCallback((file) => {
    setError("");
    
    if (!file) return false;
    
    if (!accept.split(',').includes(file.type)) {
      setError("Please upload a valid image file (SVG, PNG, or JPG)");
      return false;
    }
    
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return false;
    }
    
    return true;
  }, [accept, maxSize]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, validateFile]);

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, validateFile]);

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      />
      
      <div
        className={`
          flex flex-col items-center justify-center
          p-8 border-2 border-dashed rounded-lg
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          transition-colors duration-200
        `}
      >
        <Upload className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 text-center">
          Click to upload image
          <br />
          <span className="text-xs">SVG, PNG, or JPG</span>
        </p>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;