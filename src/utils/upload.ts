import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { UPLOAD_DIR } from './constants';

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UploadError';
  }
}

export async function validateFile(file: unknown): Promise<File> {
  if (!file || !(file instanceof File)) {
    throw new UploadError('No valid file provided');
  }
  return file;
}

export async function saveUploadedFile(file: File): Promise<string> {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(UPLOAD_DIR, fileName);
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await writeFile(filePath, buffer);
    return fileName;
  } catch (error) {
    console.error('File save error:', error);
    throw new UploadError('Failed to save file');
  }
}