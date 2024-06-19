import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { router } from './routes/Routes';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster />
      </HelmetProvider>
  </React.StrictMode>
)
