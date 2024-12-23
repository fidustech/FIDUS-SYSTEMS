import type { APIRoute } from 'astro';
import { getFile } from '../../../utils/fileStorage';
import { isAuthenticated } from '../../../utils/auth';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
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

    const file = await getFile(filename);
    
    return new Response(file, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return new Response('File not found', { status: 404 });
  }
};