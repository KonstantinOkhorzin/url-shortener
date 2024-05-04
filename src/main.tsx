import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';

import App from './App.tsx';
import { globalStyles } from './styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Global styles={globalStyles} />
  </React.StrictMode>
);
