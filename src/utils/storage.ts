import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { UPLOAD_DIR } from './constants';
import { UploadError } from './errors';

export async function saveFile(file: File): Promise<string> {
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