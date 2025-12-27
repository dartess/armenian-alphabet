/* eslint-disable @typescript-eslint/no-explicit-any -- can be used in extends */
import type { ComponentType, ReactNode, LazyExoticComponent } from 'react';
import { Suspense, lazy } from 'react';

export function lazyfy<
  T extends Record<string, ComponentType<any>>,
  TComponentName extends keyof T & string,
>(factory: () => Promise<T>, componentName: TComponentName, fallback: null | ReactNode = null) {
  const LazyComponent = lazy(() =>
    factory().then((module) => ({ default: module[componentName] })),
  );
  return {
    [`${componentName}Lazy`]: ((props) => (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    )) as LazyExoticComponent<T[TComponentName]>,
    [`preload${componentName}`]: () => factory(),
  } as {
    [P in TComponentName as `${TComponentName & string}Lazy`]: LazyExoticComponent<
      T[TComponentName]
    >;
  } & { [P in TComponentName as `preload${TComponentName & string}`]: () => Promise<void> };
}
