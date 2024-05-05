import { FC } from 'react';
import { Link } from '@mui/material';

interface Props {
  shortenedUrl: string;
}

const ShortenedLink: FC<Props> = ({ shortenedUrl }) => {
  return (
    <Link
      href={shortenedUrl}
      target='_blank'
      underline='hover'
      sx={{
        color: 'white',
        fontSize: '18px',
        position: 'absolute',
        bottom: '-35px',
        left: '14px',
      }}
    >
      {shortenedUrl}
    </Link>
  );
};

export default ShortenedLink;
