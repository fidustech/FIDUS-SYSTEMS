import { randomBytes } from 'crypto';

export function generateId(): string {
  return randomBytes(32).toString('hex');
}