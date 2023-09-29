/* eslint-disable @typescript-eslint/no-explicit-any -- can be used in extends */
import type { ComponentType, ReactNode, LazyExoticComponent } from 'react';
import { Suspense, lazy } from 'react';

export function lazyfy<T extends Record<string, ComponentType<any>>, K extends keyof T & string>(
  factory: () => Promise<T>,
  componentName: K,
  fallback: null | ReactNode = null,
) {
  const LazyComponent = lazy(() => factory().then((module) => ({ default: module[componentName] })));
  return {
    [`${componentName}Lazy`]: ((props) => (
      <Suspense fallback={fallback}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading -- it should be */}
        <LazyComponent {...props} />
      </Suspense>
    )) as LazyExoticComponent<T[K]>,
    [`preload${componentName}`]: () => factory(),
  } as {
    [P in K as `${K & string}Lazy`]: LazyExoticComponent<T[K]>;
  } & { [P in K as `preload${K & string}`]: () => Promise<void> };
}
