import type { APIRoute } from 'astro';
import { unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { UPLOAD_DIR } from '../../../utils/constants';
import { isAuthenticated } from '../../../utils/auth';

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  try {
    // Check authentication
    if (!await isAuthenticated(request)) {
      return new Response('Unauthorized', { status: 302, headers: { 'Location': '/login' } });
    }

    const { filename } = params;
    if (!filename) {
      return new Response('File not found', { status: 404 });
    }

    // Validate filename to prevent directory traversal
    if (filename.includes('/') || filename.includes('\\')) {
      return new Response('Invalid filename', { status: 400 });
    }

    const filePath = join(UPLOAD_DIR, filename);
    await unlink(filePath);
    
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/files' }
    });
  } catch (error) {
    console.error('Delete error:', error);
    if (error.code === 'ENOENT') {
      return new Response('File not found', { status: 404 });
    }
    return new Response('Error deleting file', { status: 500 });
  }
};