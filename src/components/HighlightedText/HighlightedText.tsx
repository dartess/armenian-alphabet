/* eslint-disable arrow-parens,arrow-body-style,react/no-array-index-key */

import { Fragment, useMemo } from 'react';
import Typography from '@mui/material/Typography';

import { toArray } from '@/utils/toArray';

interface Props {
  text: string;
  highlights: Array<string> | string;
}

export function HighlightedText({ text, highlights: highlightsRaw }: Props) {
  const highlights = useMemo(
    () => {
      return toArray(highlightsRaw)
        .sort((a, b) => (a.length < b.length ? 1 : -1));
    },
    [highlightsRaw],
  );

  const parts = useMemo(
    () => {
      return highlights.reduce<Array<string | { highlight: string }>>((partsAcc, highlight) => {
        return partsAcc.flatMap(part => {
          if (typeof part === 'object') {
            return part;
          }
          return part.split(highlight).flatMap((partNested, index, partsNested) => {
            return index < partsNested.length - 1 ? [partNested, { highlight }] : partNested;
          }).filter(Boolean);
        });
      }, [text]);
    },
    [highlights, text],
  );

  return (
    <>
      {parts.map((part, index) => (
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
