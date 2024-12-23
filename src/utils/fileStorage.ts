import { writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { UPLOAD_DIR } from './initStorage';

export async function saveFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(UPLOAD_DIR, fileName);
    
    await writeFile(filePath, buffer);
    return fileName;
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('Failed to save file');
  }
}

export async function getFile(fileName: string): Promise<Buffer> {
  const filePath = join(UPLOAD_DIR, fileName);
  return readFile(filePath);
}