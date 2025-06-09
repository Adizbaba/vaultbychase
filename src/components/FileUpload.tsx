import { useState } from 'react';
import { uploadImage, uploadVideo } from '@/lib/firebase/storage';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  type: 'image' | 'video';
  path: string;
  className?: string;
}

export default function FileUpload({ onUploadComplete, type, path, className = '' }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const url = type === 'image' 
        ? await uploadImage(file, path)
        : await uploadVideo(file, path);
      
      onUploadComplete(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upload');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept={type === 'image' ? 'image/*' : 'video/*'}
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
        id={`file-upload-${type}`}
      />
      <label
        htmlFor={`file-upload-${type}`}
        className={`
          inline-flex items-center justify-center px-4 py-2
          border border-transparent text-sm font-medium rounded-md
          text-white bg-blue-600 hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          cursor-pointer transition-colors duration-200
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isUploading ? 'Uploading...' : `Upload ${type}`}
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 