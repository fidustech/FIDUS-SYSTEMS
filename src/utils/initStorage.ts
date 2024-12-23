import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export const UPLOAD_DIR = join(process.cwd(), 'uploads');

export async function initializeStorage() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to initialize upload directory:', error);
    throw error;
  }
}