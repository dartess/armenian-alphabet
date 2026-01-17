import type { CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import cn from 'classnames';
import { MdClear, MdNavigateNext, MdUndo, MdSpellcheck, MdSkipNext } from 'react-icons/md';

import { calculateAccuracy, calculateAllLines, calculateSampleShape } from '@/pages/drawing/utils';
import { getDrawingQuestion, getRandomDrawingTypeKey } from '@/pages/drawing/drawingTasks';
import { useStore } from '@/core/stores';
import { LetterUnit } from '@/components/units/LetterUnit';
import { reachGoal } from '@/utils/reachGoal';
import { Button } from '@/components/Button/Button';

import { ResultIcon } from './ResultIcon/ResultIcon';
import { DrawingSample } from './DrawingSample';
import styles from './DrawingTask.module.css';
import type { Shape, Lines } from './model';

type UserDraw = Array<Array<SignaturePad.Point>>;

export const DrawingTask = observer(function DrawingTask() {
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const sigCanvasRef = useRef<SignaturePad>(null);

  const [userDrawRaw, setUserDrawRaw] = useState<UserDraw>([]);

  const clearSig = () => {
    sigCanvasRef.current?.clear();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO check it
    [drawingKey],
  );

  const letterValue = questionLetter[unitTo] as string;

  const [sampleShape, setSampleShape] = useState<Shape>([]);

  const handleCheckAccuracy = useCallback(
    () => {
      const dots = userDrawRaw.flat(2).map((d) => ({ x: d.x / 3, y: d.y / 3 }));
      setAccuracy(calculateAccuracy(sampleShape, dots));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO check it
    [userDrawRaw],
  );

  const [lines, setLines] = useState<Lines | null>(null);

  const onSampleDraw = (canvas: HTMLCanvasElement) => {
    setSampleShape(calculateSampleShape(canvas));
    setLines(calculateAllLines());
  };

  const handleDrawEnd = useCallback(() => {
    setUserDrawRaw([...sigCanvasRef.current!.toData()]);
  }, []);

  const wasDrawed = userDrawRaw.length > 0;
  const canBeCleared = wasDrawed;
  const canBeUndo = wasDrawed;
  const canBeChecked = wasDrawed;
  const handleUndo = useCallback(() => {
    setUserDrawRaw((prevDraw) => {
      if (prevDraw.length === 0) {
        return prevDraw;
      }
      const trimmed = [...prevDraw];
      trimmed.length -= 1;
      sigCanvasRef.current!.fromData(trimmed);
      return trimmed;
    });
  }, []);

  const isResultCalculated = Boolean(accuracy);

  const taskTypeText = unitTo === 'uppercase' ? 'ЗАГЛАВНУЮ' : 'строчную';
  // const taskUnit = printTaskUnit(, );
  const taskText = (
    <>
      Нарисуйте {taskTypeText} букву для{' '}
      <LetterUnit letter={questionLetter} unit={unitFrom} showVariants />
    </>
  );

  const { appTheme } = useStore('settings');
  const penColor = appTheme === 'light' ? '#000000' : '#dddddd';
  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect -- TODO refactor it
    setUserDrawRaw((prevDraw) => {
      const invertedDraw = prevDraw
        // eslint-disable-next-line @typescript-eslint/no-misused-spread -- TODO
        .map((shape) => shape.map((point) => ({ ...point, color: penColor }))) as UserDraw;
      sigCanvasRef.current!.fromData(invertedDraw);
      return invertedDraw;
    });
  }, [penColor]);

  const answerStatus = (() => {
    if (!accuracy) {
      return 'none';
    }
    return accuracy >= 95 ? 'correct' : 'wrong';
  })();

  useEffect(() => {
    switch (answerStatus) {
      case 'correct':
        reachGoal('drawCorrect');
        break;
      case 'wrong':
        reachGoal('drawWrong');
        break;
      // no default
    }
  }, [answerStatus]);

  return (
    <div className={styles.root}>
      <div className={styles.taskDescription}>{taskText}</div>
      <div className={styles.taskWorkZone}>
        <div className={styles.drawZone}>
          <div className={cn(styles.sample, { [styles.sampleShow]: isResultCalculated })}>
            <DrawingSample letterValue={letterValue} onDraw={onSampleDraw} />
          </div>
          <SignaturePad
            canvasProps={{ className: styles.sigPad }}
            onEnd={handleDrawEnd}
            ref={sigCanvasRef}
            penColor={penColor}
          />
          <div
            className={styles.lines}
            style={
              {
                '--line-color':
                  appTheme === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                ...(lines && {
                  '--cap-line': `${lines.capLine * 100}%`,
                  '--lowercase-line': `${lines.lowercaseLine * 100}%`,
                  '--base-line': `${lines.baseLine * 100}%`,
                  '--descender-line': `${lines.descenderLine * 100}%`,
                }),
              } as CSSProperties
            }
          />
          <div className={styles.accuracy}>
            {answerStatus !== 'none' && <ResultIcon result={answerStatus} />}
          </div>
          <Button
            className={cn(styles.button, { [styles.buttonUndo]: true })}
            onClick={handleUndo}
            disabled={!canBeUndo}
            variant="secondary"
            icon={<MdUndo />}
          />
          <Button
            className={cn(styles.button, { [styles.buttonClear]: true })}
            onClick={clearSig}
            disabled={!canBeCleared}
            variant="secondary"
            icon={<MdClear />}
          />
          <Button
            className={cn(styles.button, { [styles.buttonNext]: true })}
            onClick={handleNextLetter}
            variant="secondary"
            icon={<MdSkipNext />}
          />
          {isResultCalculated ? (
            <Button
              className={cn(styles.button, { [styles.buttonPrimaryAction]: true })}
              onClick={handleNextLetter}
              endIcon={<MdNavigateNext />}
              variant="secondary"
            >
              Дальше
            </Button>
          ) : (
            <Button
              className={cn(styles.button, { [styles.buttonPrimaryAction]: true })}
              onClick={handleCheckAccuracy}
              endIcon={<MdSpellcheck />}
              disabled={!canBeChecked}
              variant="secondary"
            >
              Проверить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});
