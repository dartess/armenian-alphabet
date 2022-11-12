/**
 * isCanUseStorage() доступность для использования
 * хранилищ sessionStorage и localStorage
 *
 * @example
 * if (canUseStorage) {
 *     localStorage.setItem("foo", "bar");
 * }
 */

let canUseStorageRaw = false;
try {
  const randomHash = 'skjs3El3TzFX4gCS';
  // исключение для использования localStorage и sessionStorage напрямую
  localStorage.setItem(randomHash, randomHash);
  canUseStorageRaw = localStorage.getItem(randomHash) === randomHash;
  localStorage.removeItem(randomHash);
} catch {
  // Storage недоступен, ну да и ладно
}

export const canUseStorage = canUseStorageRaw;
