import { useEffect, useRef } from 'react';

import { useUpdatedRef } from '@/utils/useUpdatedRef';

import styles from './DrawingTask.module.css';

interface Props {
  letterValue: string;
  onDraw: (canvas: HTMLCanvasElement) => void;
}
export function DrawingSample({ letterValue, onDraw }: Props) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const onDrawRef = useUpdatedRef(onDraw);

  useEffect(() => {
    const { current: canvas } = refCanvas;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '246px Arial';
    ctx.fillStyle = '#808080';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = canvas.width / 2;
    const centerY = (canvas.height / 2) - 6;

    ctx.fillText(letterValue, centerX, centerY);
    onDrawRef.current(canvas);
  }, [letterValue, onDrawRef]);

  return <canvas ref={refCanvas} className={styles.sampleCanvas} width={300} height={300} />;
}
