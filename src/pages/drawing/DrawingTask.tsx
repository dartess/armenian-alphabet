import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import cn from 'classnames';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import UndoIcon from '@mui/icons-material/Undo';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Typography from '@mui/material/Typography';

import { calculateAccuracy, getSampleShape } from '@/pages/drawing/utils';
import { getDrawingQuestion, getRandomDrawingTypeKey } from '@/pages/drawing/drawingTasks';
import { useStore } from '@/core/stores';
import { printTaskUnit } from '@/utils/printTaskUnit';

import styles from './DrawingTask.module.css';
import type { Shape } from './model';

export function DrawingTask() {
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const sigCanvas = useRef<SignaturePad>(null);

  const [userDrawRaw, setUserDrawRaw] = useState<Array<Array<SignaturePad.Point>>>([]);

  const clearSig = () => {
    sigCanvas.current?.clear();
    setUserDrawRaw([]);
  };

  const [drawingKey, setDrawingKey] = useState(getRandomDrawingTypeKey);

  const handleNextLetter = () => {
    setDrawingKey(getRandomDrawingTypeKey({ exclude: [drawingKey] }));
    setAccuracy(null);
    clearSig();
  };

  const { totalProgress } = useStore('progress');

  const { questionLetter, unitFrom, unitTo } = useMemo(
    () => getDrawingQuestion(drawingKey, totalProgress),
    [drawingKey],
  );

  const letterValue = questionLetter[unitTo as Exclude<typeof unitTo, 'meta'>];
  const letterMod = unitTo === 'uppercase' ? '+' : '-';
  const letterSamplePath = `/letters/${letterValue}${letterMod}.png`;

  const [sampleShape, setSampleShape] = useState<Shape>([]);

  const handleCheckAccuracy = useCallback(
    () => {
      const dots = userDrawRaw.flat(2).map((d) => ({ x: d.x / 3, y: d.y / 3 }));
      setAccuracy(calculateAccuracy(sampleShape, dots));
    },
    [userDrawRaw],
  );

  useEffect(() => {
    (async () => {
      setSampleShape(await getSampleShape(letterSamplePath));
    })();
  }, [letterSamplePath]);

  const handleDrawEnd = useCallback(
    () => setUserDrawRaw(sigCanvas.current!.toData()),
    [],
  );

  const canBeUndo = userDrawRaw.length > 0;
  const handleUndo = useCallback(
    () => {
      setUserDrawRaw((prevDraw) => {
        if (prevDraw.length === 0) {
          return prevDraw;
        }
        const trimmed = [...prevDraw];
        trimmed.length -= 1;
        sigCanvas.current!.fromData(trimmed);
        return trimmed;
      });
    },
    [],
  );

  const isResultCalculated = Boolean(accuracy);

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
            onEnd={handleDrawEnd}
            ref={sigCanvas}
          />
          <div
            className={cn(styles.sample, { [styles.sampleShow]: isResultCalculated })}
            style={{ backgroundImage: `url("${letterSamplePath}")` }}
          />
          <div className={styles.lines} />
          <div className={styles.accuracy}>
            {(() => {
              if (!accuracy) {
                return null;
              }
              return accuracy >= 95 ? <ThumbUpOffAltIcon color="success" /> : <ThumbDownOffAltIcon color="warning" />;
            })()}
          </div>
          <Button
            className={cn(styles.button, { [styles.buttonUndo]: true })}
            onClick={handleUndo}
            size="small"
            disabled={!canBeUndo}
          >
            <UndoIcon />
          </Button>
          <Button
            className={cn(styles.button, { [styles.buttonClear]: true })}
            onClick={clearSig}
            size="small"
          >
            <ClearIcon />
          </Button>
          <Button
            className={cn(styles.button, { [styles.buttonNext]: true })}
            onClick={handleNextLetter}
            size="small"
          >
            <SkipNextIcon />
          </Button>
          {isResultCalculated
            ? (
              <Button
                className={cn(styles.button, { [styles.buttonPrimaryAction]: true })}
                onClick={handleNextLetter}
                endIcon={<NavigateNextIcon />}
                size="small"
              >
                Дальше
              </Button>
            )
            : (
              <Button
                className={cn(styles.button, { [styles.buttonPrimaryAction]: true })}
                onClick={handleCheckAccuracy}
                endIcon={<SpellcheckIcon />}
                size="small"
              >
                Проверить
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}
