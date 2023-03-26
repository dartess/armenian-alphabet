import { useRef } from 'react';

// https://css-tricks.com/dealing-with-stale-props-and-states-in-reacts-functional-components/
export function useUpdatedRef<T>(data: T) {
  const ref = useRef(data);
  ref.current = data;
  return ref;
}
