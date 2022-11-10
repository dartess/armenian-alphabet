import type { CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';
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

type UserDraw = Array<Array<SignaturePad.Point>>;

export const DrawingTask = observer(function DrawingTask() {
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const sigCanvas = useRef<SignaturePad>(null);

  const [userDrawRaw, setUserDrawRaw] = useState<UserDraw>([]);

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
    () => {
      setUserDrawRaw([...sigCanvas.current!.toData()]);
    },
    [],
  );

  const wasDrawed = userDrawRaw.length > 0;
  const canBeUndo = wasDrawed;
  const canBeChecked = wasDrawed;
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

  const taskTypeText = unitTo === 'uppercase' ? 'ЗАГЛАВНУЮ' : 'строчную';
  const taskUnit = printTaskUnit(questionLetter, unitFrom);
  const taskText = `Нарисуйте ${taskTypeText} букву для ${taskUnit}`;

  const { appTheme } = useStore('settings');
  const penColor = appTheme === 'light' ? '#000000' : '#dddddd';
  useEffect(() => {
    setUserDrawRaw((prevDraw) => {
      const invertedDraw = prevDraw
        .map((shape) => shape.map((point) => ({ ...point, color: penColor }))) as UserDraw;
      sigCanvas.current!.fromData(invertedDraw);
      return invertedDraw;
    });
  }, [penColor]);

  return (
    <div className={styles.root}>
      <div className={styles.taskDescription}>
        <Typography variant="h5" gutterBottom align="center">
          {taskText}
        </Typography>
      </div>
      <div className={styles.taskWorkZone}>
        <div className={styles.drawZone}>
          <SignaturePad
            canvasProps={{ className: styles.sigPad }}
            onEnd={handleDrawEnd}
            ref={sigCanvas}
            penColor={penColor}
          />
          <div
            className={cn(styles.sample, { [styles.sampleShow]: isResultCalculated })}
            style={{ backgroundImage: `url("${letterSamplePath}")` }}
          />
          <div
            className={styles.lines}
            style={{
              '--line-color': appTheme === 'light'
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(255, 255, 255, 0.1)',
            } as CSSProperties}
          />
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
                disabled={!canBeChecked}
              >
                Проверить
              </Button>
            )}
        </div>
      </div>
    </div>
  );
});
