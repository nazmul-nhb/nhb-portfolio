import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { router } from './routes/Routes';

import './index.css';
import ScrollButtons from './components/ScrollButtons/ScrollButtons';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
        <ScrollButtons/>
        <Toaster />
      </HelmetProvider>
  </React.StrictMode>
)
