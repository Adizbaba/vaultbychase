import { storage } from './clientApp';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Define allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Helper function to validate file type and size
const validateFile = (file: File, allowedTypes: string[]) => {
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }
};

// Upload an image file
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    validateFile(file, ALLOWED_IMAGE_TYPES);
    const storageRef = ref(storage, `images/${path}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Upload a video file
export const uploadVideo = async (file: File, path: string): Promise<string> => {
  try {
    validateFile(file, ALLOWED_VIDEO_TYPES);
    const storageRef = ref(storage, `videos/${path}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

// Delete a file from storage
export const deleteFile = async (url: string): Promise<void> => {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Get a download URL for a file
export const getFileUrl = async (path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
}; 