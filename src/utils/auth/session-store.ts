import type { Session } from './types';

class SessionStore {
  private sessions = new Map<string, number>();

  set(sessionId: string, expires: number): void {
    this.sessions.set(sessionId, expires);
  }

  get(sessionId: string): number | undefined {
    return this.sessions.get(sessionId);
  }

  delete(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [id, expires] of this.sessions.entries()) {
      if (now > expires) {
        this.sessions.delete(id);
      }
    }
  }
}

// Singleton instance
export const sessionStore = new SessionStore();