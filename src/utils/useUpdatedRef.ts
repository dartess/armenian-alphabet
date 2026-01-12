import { useRef } from 'react';

// https://css-tricks.com/dealing-with-stale-props-and-states-in-reacts-functional-components/
export function useUpdatedRef<T>(data: T) {
  const ref = useRef(data);
  // eslint-disable-next-line react-hooks/refs -- TODO remove this hooks after update react + useEffectEvent
  ref.current = data;
  return ref;
}
