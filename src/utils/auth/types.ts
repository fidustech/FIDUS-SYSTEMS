export interface Session {
  id: string;
  expires: number;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  sessionId?: string;
}

export type MiddlewareResult = Response | null;

export interface RedirectOptions {
  status?: number;
  headers?: Record<string, string>;
}