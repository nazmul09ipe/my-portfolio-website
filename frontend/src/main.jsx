import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-center"
      containerStyle={{ zIndex: 9999999 }}
      toastOptions={{
        duration: 4000,
        style: {
          zIndex: 9999999,
        },
        className: 'glass-premium !text-slate-100 !rounded-2xl',
      }}
    />
  </StrictMode>
);