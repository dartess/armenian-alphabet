import { useCallback, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import ReactConfetti from 'react-confetti';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export function Congratulations() {
  const { width, height } = useWindowSize();
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const handleCloseDialog = useCallback(() => {
    setIsOpenDialog(false)
  }, []);
  return (
    <>
      <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
        <DialogTitle align="center">Поздравляем!</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 1 }} align="center">
            Похоже, вы успешно изучили весь алфавит!
          </DialogContentText>
          <DialogContentText align="center">
            Продолжайте практиковаться и изучать армянский язык!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Продолжить</Button>
        </DialogActions>
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
