import { useReducer } from 'react';

const toggleReducer = (state: boolean, action: boolean | undefined) =>
  typeof action === 'boolean' ? action : !state;

export const useToggle = (
  initialValue: boolean,
): [value: boolean, toggle: (nextValue?: boolean) => void] => {
  return useReducer(toggleReducer, initialValue);
};
