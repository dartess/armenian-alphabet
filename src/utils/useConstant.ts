import { useState } from 'react';

export function useConstant<T>(fn: () => T): T {
  return useState<T>(fn)[0];
}
