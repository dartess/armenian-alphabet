export function toArray<T>(maybeArray: T | Array<T>): Array<T> {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
