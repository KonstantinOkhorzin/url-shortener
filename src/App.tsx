import { useState, useEffect } from 'react';
import { Typography, Box, Link } from '@mui/material';

import { getShortenedURL } from './services';
import { UrlForm } from './components';
import { Status } from './types';

function App() {
  const [fullUrl, setFullUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(Status.IDLE);

  useEffect(() => {
    if (!fullUrl) return;
    setShortenedUrl('');

    setStatus(Status.PENDING);

    getShortenedURL(fullUrl)
      .then(res => {
        setShortenedUrl(res.result_url);
        setStatus(Status.FULFILLED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [fullUrl]);

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
      <Typography align='center' variant='h3' component='h1' sx={{ color: 'white' }} mb={3}>
        Paste a link to shorten it
      </Typography>

      <UrlForm setFullUrl={setFullUrl} status={status} />

      {error && (
        <Typography color='error' sx={{ position: 'absolute', bottom: '-35px', left: '14px' }}>
          {error}
        </Typography>
      )}

      {shortenedUrl && status === Status.FULFILLED && (
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
      )}
    </Box>
  );
}

export default App;
