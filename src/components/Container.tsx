import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: 'max-content',
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
