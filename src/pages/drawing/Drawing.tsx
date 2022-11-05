import { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';

import { lowercaseShapes } from '@/pages/drawing/alphabetShapes';

import styles from './Drawing.module.css';
// import type { Point } from './model';

// const letterShape = [
//   {
//     x: 80,
//     y: 39.5,
//   },
//   {
//     x: 80,
//     y: 44.5,
//   },
//   {
//     x: 80,
//     y: 49.5,
//   },
//   {
//     x: 80,
//     y: 54.5,
//   },
//   {
//     x: 80,
//     y: 59.5,
//   },
//   {
//     x: 80,
//     y: 64.5,
//   },
//   {
//     x: 80,
//     y: 69.5,
//   },
//   {
//     x: 81,
//     y: 74.5,
//   },
//   {
//     x: 81,
//     y: 79.5,
//   },
//   {
//     x: 81,
//     y: 84.5,
//   },
//   {
//     x: 81,
//     y: 89.5,
//   },
//   {
//     x: 81,
//     y: 95.5,
//   },
//   {
//     x: 81,
//     y: 100.5,
//   },
//   {
//     x: 81,
//     y: 105.5,
//   },
//   {
//     x: 81,
//     y: 110.5,
//   },
//   {
//     x: 81,
//     y: 115.5,
//   },
//   {
//     x: 81,
//     y: 120.5,
//   },
//   {
//     x: 81,
//     y: 125.5,
//   },
//   {
//     x: 81,
//     y: 130.5,
//   },
//   {
//     x: 81,
//     y: 135.5,
//   },
//   {
//     x: 81,
//     y: 140.5,
//   },
//   {
//     x: 81,
//     y: 145.5,
//   },
//   {
//     x: 82,
//     y: 150.5,
//   },
//   {
//     x: 82,
//     y: 155.5,
//   },
//   {
//     x: 83,
//     y: 160.5,
//   },
//   {
//     x: 83,
//     y: 165.5,
//   },
//   {
//     x: 84,
//     y: 170.5,
//   },
//   {
//     x: 86,
//     y: 175.5,
//   },
//   {
//     x: 87,
//     y: 180.5,
//   },
//   {
//     x: 90,
//     y: 184.5,
//   },
//   {
//     x: 93,
//     y: 188.5,
//   },
//   {
//     x: 97,
//     y: 191.5,
//   },
//   {
//     x: 101,
//     y: 194.5,
//   },
//   {
//     x: 105,
//     y: 197.5,
//   },
//   {
//     x: 109,
//     y: 200.5,
//   },
//   {
//     x: 114,
//     y: 202.5,
//   },
//   {
//     x: 119,
//     y: 203.5,
//   },
//   {
//     x: 124,
//     y: 204.5,
//   },
//   {
//     x: 129,
//     y: 204.5,
//   },
//   {
//     x: 134,
//     y: 204.5,
//   },
//   {
//     x: 139,
//     y: 204.5,
//   },
//   {
//     x: 144,
//     y: 204.5,
//   },
//   {
//     x: 149,
//     y: 203.5,
//   },
//   {
//     x: 153,
//     y: 200.5,
//   },
//   {
//     x: 157,
//     y: 197.5,
//   },
//   {
//     x: 162,
//     y: 196.5,
//   },
//   {
//     x: 166,
//     y: 193.5,
//   },
//   {
//     x: 171,
//     y: 191.5,
//   },
//   {
//     x: 174,
//     y: 187.5,
//   },
//   {
//     x: 178,
//     y: 184.5,
//   },
//   {
//     x: 182,
//     y: 181.5,
//   },
//   {
//     x: 185,
//     y: 177.5,
//   },
//   {
//     x: 188,
//     y: 172.5,
//   },
//   {
//     x: 190,
//     y: 167.5,
//   },
//   {
//     x: 191,
//     y: 162.5,
//   },
//   {
//     x: 193,
//     y: 157.5,
//   },
//   {
//     x: 193,
//     y: 152.5,
//   },
//   {
//     x: 193,
//     y: 147.5,
//   },
//   {
//     x: 193,
//     y: 142.5,
//   },
//   {
//     x: 193,
//     y: 137.5,
//   },
//   {
//     x: 193,
//     y: 132.5,
//   },
//   {
//     x: 193,
//     y: 127.5,
//   },
//   {
//     x: 192,
//     y: 122.5,
//   },
//   {
//     x: 192,
//     y: 117.5,
//   },
//   {
//     x: 191,
//     y: 112.5,
//   },
//   {
//     x: 191,
//     y: 107.5,
//   },
//   {
//     x: 190,
//     y: 101.5,
//   },
//   {
//     x: 190,
//     y: 96.5,
//   },
//   {
//     x: 190,
//     y: 90.5,
//   },
//   {
//     x: 190,
//     y: 85.5,
//   },
//   {
//     x: 190,
//     y: 79.5,
//   },
//   {
//     x: 190,
//     y: 72.5,
//   },
//   {
//     x: 190,
//     y: 65.5,
//   },
//   {
//     x: 190,
//     y: 60.5,
//   },
//   {
//     x: 190,
//     y: 55.5,
//   },
//   {
//     x: 190,
//     y: 49.5,
//   },
//   {
//     x: 191,
//     y: 43.5,
//   },
//   {
//     x: 192,
//     y: 38.5,
//   },
//   {
//     x: 192,
//     y: 33.5,
//   },
//   {
//     x: 191,
//     y: 43.5,
//   },
//   {
//     x: 192,
//     y: 33.5,
//   },
//   {
//     x: 236,
//     y: 208.5,
//   },
//   {
//     x: 236,
//     y: 203.5,
//   },
//   {
//     x: 236,
//     y: 195.5,
//   },
//   {
//     x: 236,
//     y: 190.5,
//   },
//   {
//     x: 237,
//     y: 185.5,
//   },
//   {
//     x: 233,
//     y: 182.5,
//   },
//   {
//     x: 231,
//     y: 177.5,
//   },
//   {
//     x: 228,
//     y: 173.5,
//   },
//   {
//     x: 224,
//     y: 170.5,
//   },
//   {
//     x: 219,
//     y: 169.5,
//   },
//   {
//     x: 213,
//     y: 166.5,
//   },
//   {
//     x: 208,
//     y: 165.5,
//   },
//   {
//     x: 203,
//     y: 164.5,
//   },
//   {
//     x: 198,
//     y: 162.5,
//   },
//   {
//     x: 193,
//     y: 162.5,
//   },
//   {
//     x: 203,
//     y: 164.5,
//   },
//   {
//     x: 193,
//     y: 163.5,
//   },
// ];

// function length(pointA: Point, pointB: Point): number {
//   const ac = pointB.x - pointA.x;
//   const bc = pointB.y - pointA.y;
//   return Math.sqrt(ac ** 2 + bc ** 2);
// }

// function average(arr: Array<number>) {
//   if (arr.length === 0) {
//     return 0;
//   }
//   let sum = 0;
//   for (const val of arr) {
//     sum += val;
//   }
//   return sum / arr.length;
// }

// function accuracy(sample: Array<Point>, input: Array<Point>): number {
//   const lengthsForDots: Array<Array<number>> = [];
//   for (let i = 0; i < sample.length; i += 1) {
//     for (let j = 0; j < input.length; j += 1) {
//       lengthsForDots[i] ??= [];
//       lengthsForDots[i][j] = length(sample[i], input[j]) / 3;
//     }
//   }
//   const minLengthsForDots = lengthsForDots.map((lengths) => Math.min(...lengths));
//   return 100 - average(minLengthsForDots);
// }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.result = {};

export function Drawing() {
  // const [result, setResult] = useState(0);
  const sigCanvas = useRef<SignaturePad>(null);
  const [drawLetter, setDrawLetter] = useState('');

  return (
    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', height: '100%', gap: '15px' }}>
      <div style={{
        gridRow: '1/2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
      >
        <div>
          {Object.keys(lowercaseShapes).map((letter) => (
            <button
              type="button"
              key={letter}
              style={{ fontSize: '25px' }}
              onClick={() => {
                sigCanvas.current?.clear();
                setDrawLetter(letter);
              }}
            >
              {letter}
            </button>
          ))}
        </div>
        {/* <div> */}
        {/*  {Math.round(result)} */}
        {/*  % */}
        {/* </div> */}
        <div>
          <button
            type="button"
            onClick={() => {
              const dots = sigCanvas.current!.toData().flat(2).map((d) => ({ x: d.x, y: d.y }));

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              window.result[drawLetter] = dots;

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              navigator.clipboard.writeText(JSON.stringify(window.result, null, 2)).then( // eslint-disable-line compat/compat
                () => {
                  // alert('ok')
                },
                () => alert('FAIL!'),
              );
            }}
          >
            сохранить
          </button>
          {/* <button */}
          {/* type="button" */}
          {/* onClick={() => { */}
          {/*   const dots = sigCanvas.current!.toData().flat(2).map((d) => ({ x: d.x, y: d.y })); */}
          {/*   setResult(accuracy(letterShape, dots)); */}
          {/* }} */}
          {/* > */}
          {/* проверить */}
          {/* </button> */}
          <button
            type="button"
            onClick={() => sigCanvas.current?.clear()}
          >
            очистить
          </button>
        </div>
        {/* Нарисуй что-то */}
      </div>
      <div style={{ gridRow: '2/3', display: 'flex', justifyContent: 'center' }}>
        <div className={styles.drawZone}>
          <SignaturePad
            canvasProps={{ className: styles.sigPad }}
            ref={sigCanvas}
          />
          <div
            className={styles.sample}
            style={{ backgroundImage: `url("/armenian-alphabet/letters/${drawLetter}-.png")` }}
          />
          <div className={styles.lines} />
        </div>
      </div>
    </div>
  );
}
