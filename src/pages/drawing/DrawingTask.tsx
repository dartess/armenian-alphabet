import { useEffect, useMemo, useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import cn from 'classnames';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Typography from '@mui/material/Typography';

import { getAccuracy, getSampleShape } from '@/pages/drawing/utils';
import { getDrawingQuestion, getRandomDrawingTypeKey } from '@/pages/drawing/drawingTasks';
import { useStore } from '@/core/stores';
import { printTaskUnit } from '@/utils/printTaskUnit';

import styles from './DrawingTask.module.css';
import type { Shape } from './model';

export function DrawingTask() {
  const [accuracy, setAccuracy] = useState(0);
  const sigCanvas = useRef<SignaturePad>(null);
  const [sampleShape, setSampleShape] = useState<Shape>([]);

  const clearSig = () => sigCanvas.current?.clear();

  const [drawingKey, setDrawingKey] = useState(getRandomDrawingTypeKey);
  const handleNextDrawing = () => {
    setDrawingKey(getRandomDrawingTypeKey({ exclude: [drawingKey] }));
    setAccuracy(0);
    clearSig();
  };

  const { totalProgress } = useStore('progress');

  const { questionLetter, unitFrom, unitTo } = useMemo(
    () => getDrawingQuestion(drawingKey, totalProgress),
    [drawingKey],
  );

  const letterValue = questionLetter[unitTo as Exclude<typeof unitTo, 'meta'>];
  const letterMod = unitTo === 'uppercase' ? '+' : '-';
  const letterSamplePath = `/armenian-alphabet/letters/${letterValue}${letterMod}.png`;

  const handleCheckAccuracy = () => {
    const dots = sigCanvas.current!.toData().flat(2).map((d) => ({ x: d.x / 3, y: d.y / 3 }));
    setAccuracy(getAccuracy(sampleShape, dots));
  };

  useEffect(() => {
    (async () => {
      setSampleShape(await getSampleShape(letterSamplePath));
    })();
  }, [letterSamplePath]);

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto auto', height: '100%', gap: '15px' }}>
      <div style={{
        gridRow: '1/2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 15px',
      }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Нарисуйте
          {' '}
          {unitTo === 'uppercase' ? 'ЗАГЛАВНУЮ' : 'строчную'}
          {' '}
          букву для
          {' '}
          {printTaskUnit(questionLetter, unitFrom)}
        </Typography>
      </div>
      <div style={{ gridRow: '2/3', display: 'flex', justifyContent: 'center' }}>
        <div className={styles.drawZone}>
          <SignaturePad
            canvasProps={{ className: styles.sigPad }}
            ref={sigCanvas}
          />
          <div
            className={cn(styles.sample, { [styles.sampleShow]: accuracy > 0 })}
            style={{ backgroundImage: `url("${letterSamplePath}")` }}
          />
          <div className={styles.lines} />
          <div className={styles.accuracy}>
            {(() => {
              if (accuracy === 0) {
                return null;
              }
              return accuracy >= 95 ? <ThumbUpOffAltIcon color="success" /> : <ThumbDownOffAltIcon color="warning" />;
            })()}
          </div>
          <Button
            className={styles.buttonClear}
            onClick={clearSig}
            startIcon={<ClearIcon />}
            size="small"
          >
            Очистить
          </Button>
          <Button
            className={styles.buttonCheck}
            onClick={handleCheckAccuracy}
            endIcon={<SpellcheckIcon />}
            size="small"
          >
            Проверить
          </Button>
          <Button
            className={styles.buttonNext}
            onClick={handleNextDrawing}
            endIcon={<NavigateNextIcon />}
            size="small"
          >
            Дальше
          </Button>
        </div>
      </div>
    </div>
  );
}
