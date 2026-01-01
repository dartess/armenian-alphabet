import Typography from '@mui/material/Typography';

export function DrawingEmpty() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px',
      }}
    >
      <Typography variant="h6" align="center">
        Вы ещё не начали изучать алфавит. Приходите позже.
      </Typography>
    </div>
  );
}
