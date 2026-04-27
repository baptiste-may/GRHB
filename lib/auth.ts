import { scryptSync, timingSafeEqual, randomBytes } from 'node:crypto';

/**
 * Vérifie un mot de passe par rapport à un hash stocké
 * Le format attendu du hash est "salt:derivedKey"
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) {
      return false;
    }
    const saltBuffer = Buffer.from(salt, 'hex');
    const derivedKey = scryptSync(password, saltBuffer, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    
    return timingSafeEqual(derivedKey, keyBuffer);
  } catch {
    return false;
  }
}

/**
 * Utile pour générer un hash initial (à utiliser dans un script ou console)
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}
