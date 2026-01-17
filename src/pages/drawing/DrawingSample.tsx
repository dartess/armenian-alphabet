import { useEffect, useRef } from 'react';

import { useUpdatedRef } from '@/utils/useUpdatedRef';

import { drawLetter } from './utils';
import styles from './DrawingTask.module.css';

type Props = {
  letterValue: string;
  onDraw: (canvas: HTMLCanvasElement) => void;
};
export function DrawingSample({ letterValue, onDraw }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDrawRef = useUpdatedRef(onDraw);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) {
      return;
    }
    drawLetter(canvas, letterValue);
    onDrawRef.current(canvas);
  }, [letterValue, onDrawRef]);

  return <canvas ref={canvasRef} className={styles.sampleCanvas} width={300} height={300} />;
}
