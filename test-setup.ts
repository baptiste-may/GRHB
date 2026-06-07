import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
}

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    length: 0,
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

// Provide global mocks for storage to avoid warnings and errors during Nuxt init
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  Object.defineProperty(window, 'sessionStorage', { value: localStorageMock });
}

// Silence experimental Suspense warning
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('<Suspense> is an experimental feature')) {
    return;
  }
  originalWarn(...args);
};
