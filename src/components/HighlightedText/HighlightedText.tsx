import { Fragment, useMemo } from 'react';
import Typography from '@mui/material/Typography';

import { toArray } from '@/utils/toArray';

interface Props {
  text: string;
  highlights: Array<string> | string;
  textCase?: 'uppercase' | 'lowercase';
}

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

  const highlights = useMemo(
    () => {
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
    },
    [highlightsRaw, textCase],
  );

  const parts = useMemo(
    () => {
      return highlights.reduce<Array<string | { highlight: string }>>((partsAcc, highlight) => {
        return partsAcc.flatMap((part) => {
          if (typeof part === 'object') {
            return part;
          }
          return part.split(highlight).flatMap((partNested, index, partsNested) => {
            return index < partsNested.length - 1 ? [partNested, { highlight }] : partNested;
          }).filter(Boolean);
        });
      }, [textCased]);
    },
    [highlights, textCased],
  );

  return (
    <>
      {parts.map((part, index) => (
        // eslint-disable-next-line react/no-array-index-key -- no variants
        <Fragment key={index}>
          {typeof part === 'string'
            ? part
            : (
              <Typography
                color="primary"
                component="span"
                fontSize="inherit"
                fontWeight="bold"
              >
                {part.highlight}
              </Typography>
            )}
        </Fragment>
      ))}
    </>
  );
}
