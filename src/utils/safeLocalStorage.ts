import { canUseStorage } from './canUseStorage';

/**
 * Объект-замена localStorage с некоторыми его методами. Позволяет задавать дефолтное значение в
 * getItem.
 */
export const safeLocalStorage = {
  getItem(key: string, fallbackValue: string | null = null): string | null {
    if (!canUseStorage) {
      return fallbackValue;
    }
    // Исключение для использования localStorage и sessionStorage напрямую.
    return localStorage.getItem(key);
  },

  setItem(key: string, value: string): void {
    if (canUseStorage) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // overflow maybe
        localStorage.clear();
      }
    }
  },

  removeItem(key: string): void {
    if (canUseStorage) {
      localStorage.removeItem(key);
    }
  },
};
