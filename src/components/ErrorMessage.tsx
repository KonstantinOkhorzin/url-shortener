import { FC } from 'react';
import { Typography } from '@mui/material';

interface Props {
  error: string;
}

const ErrorMessage: FC<Props> = ({ error }) => {
  return (
    <Typography color='error' sx={{ position: 'absolute', bottom: '-35px', left: '14px' }}>
      {error}
    </Typography>
  );
};

export default ErrorMessage;
