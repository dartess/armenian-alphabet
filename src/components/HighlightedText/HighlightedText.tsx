import { Fragment, useMemo } from 'react';

import { toArray } from '@/utils/toArray';

import styles from './HighlightedText.module.css';

type Props = {
  text: string;
  highlights: Array<string> | string;
  textCase?: 'uppercase' | 'lowercase';
};

export function HighlightedText({ text, highlights: highlightsRaw, textCase }: Props) {
  const textCased = useMemo(() => {
    switch (textCase) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      default:
        return text;
    }
  }, [text, textCase]);

  const highlights = useMemo(() => {
    const highlightsArray = toArray(highlightsRaw);
    const highlightsCased = (() => {
      switch (textCase) {
        case 'uppercase':
          return highlightsArray.map((item) => item.toUpperCase());
        case 'lowercase':
          return highlightsArray.map((item) => item.toLowerCase());
        default:
          return highlightsArray;
      }
    })();
    return highlightsCased.sort((a, b) => (a.length < b.length ? 1 : -1));
  }, [highlightsRaw, textCase]);

  const parts = useMemo(
    () =>
      highlights.reduce<Array<string | { highlight: string }>>(
        (partsAcc, highlight) =>
          partsAcc.flatMap((part) => {
            if (typeof part === 'object') {
              return part;
            }
            return part
              .split(highlight)
              .flatMap((partNested, index, partsNested) =>
                index < partsNested.length - 1 ? [partNested, { highlight }] : partNested,
              )
              .filter(Boolean);
          }),
        [textCased],
      ),
    [highlights, textCased],
  );

  return (
    <>
      {parts.map((part, index) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key -- no options
        <Fragment key={index}>
          {typeof part === 'string' ? (
            part
          ) : (
            <span className={styles.highlight}>{part.highlight}</span>
          )}
        </Fragment>
      ))}
    </>
  );
}
