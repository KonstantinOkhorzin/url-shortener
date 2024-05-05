import { useState, useEffect } from 'react';

import { getShortenedURL } from './services';
import { Container, ErrorMessage, ShortenedLink, Title, UrlForm } from './components';
import { Status } from './types';

function App() {
  const [fullUrl, setFullUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);

  useEffect(() => {
    if (!fullUrl) return;

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
    <Container>
      <Title />

      <UrlForm setFullUrl={setFullUrl} setError={setError} setStatus={setStatus} status={status} />

      {status === Status.REJECTED && <ErrorMessage error={error} />}

      {status === Status.FULFILLED && <ShortenedLink shortenedUrl={shortenedUrl} />}
    </Container>
  );
}

export default App;
