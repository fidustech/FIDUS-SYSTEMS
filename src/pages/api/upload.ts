import type { APIRoute } from 'astro';
import { validateUpload } from '../../utils/validation';
import { saveFile } from '../../utils/storage';
import { UploadError } from '../../utils/errors';
import { isAuthenticated } from '../../utils/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check authentication
    if (!await isAuthenticated(request)) {
      return new Response('Unauthorized', { status: 302, headers: { 'Location': '/login' } });
    }

    const formData = await request.formData();
    const file = await validateUpload(formData);
    await saveFile(file);
    
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/files' }
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    if (error instanceof UploadError) {
      return new Response(error.message, { status: 400 });
    }
    
    return new Response('Internal server error', { status: 500 });
  }
};