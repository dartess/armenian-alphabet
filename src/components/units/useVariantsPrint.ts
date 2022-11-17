import { useMemo } from 'react';

import { toArray } from '@/utils/toArray';

type MapFn<TInput, TOutput = TInput> = (item: TInput) => TOutput;

function same<T>(item: T): T {
  return item;
}

export function useVariantsPrint(
  value: string | Array<string>,
  showVariants: boolean,
  separator: string,
  mapFn: MapFn<string> = same,
) {
  return useMemo(
    () => toArray(value).slice(0, showVariants ? undefined : 1).map(mapFn).join(separator),
    [mapFn, separator, showVariants, value],
  );
}
