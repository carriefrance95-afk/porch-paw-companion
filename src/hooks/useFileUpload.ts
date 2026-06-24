import { useState } from 'react';
import { uploadFile, deleteFile } from '../lib/storage';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (bucket: string, file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const url = await uploadFile(bucket, fileName, file);
      return { url, fileName };
    } catch (err: any) {
      const msg = err.message || 'Failed to upload file';
      setError(msg);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const remove = async (bucket: string, path: string) => {
    try {
      await deleteFile(bucket, path);
    } catch (err: any) {
      console.error('Error deleting file:', err);
    }
  };

  return { upload, remove, isUploading, error };
};
