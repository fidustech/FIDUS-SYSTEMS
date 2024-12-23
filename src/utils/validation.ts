import { UploadError } from './errors';

export async function validateUpload(formData: FormData): Promise<File> {
  const file = formData.get('file');
  
  if (!file || !(file instanceof File)) {
    throw new UploadError('No valid file provided');
  }
  
  return file;
}