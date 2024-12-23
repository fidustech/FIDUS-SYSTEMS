const DEV_PASSWORD = 'fidus2024';

export function verifyPassword(password: string): boolean {
  return password === DEV_PASSWORD;
}