import { useCallback, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import ReactConfetti from 'react-confetti';

import { Button } from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';

export function Congratulations() {
  const { width, height } = useWindowSize();
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const handleCloseDialog = useCallback(() => {
    setIsOpenDialog(false);
  }, []);
  return (
    <>
      <Dialog
        open={isOpenDialog}
        onOpenChange={handleCloseDialog}
        title="Поздравляем!"
        actions={<Button onClick={handleCloseDialog}>Продолжить</Button>}
      >
        <p>Похоже, вы успешно изучили весь алфавит!</p>
        <p>Продолжайте практиковаться и изучать армянский язык!</p>
      </Dialog>
      <ReactConfetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
        style={{ zIndex: 2000 }}
      />
    </>
  );
}
