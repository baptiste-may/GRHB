/**
 * Verifies a password against a stored plain text password.
 */
export function verifyPassword(password: string, storedPassword: string): boolean {
  return password === storedPassword;
}
