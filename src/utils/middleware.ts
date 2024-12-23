export function createRedirect(url: string, init?: ResponseInit): Response {
  return new Response(null, {
    status: 302,
    headers: { Location: url },
    ...init
  });
}

export function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith('/docs') || 
         pathname.startsWith('/files') || 
         pathname === '/';
}