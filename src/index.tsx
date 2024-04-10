import AppProvider from 'providers/AppProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from 'Routes';
import ChatWidgetProvider from 'providers/ChatWidgetProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ToastProvider from 'providers/ToastProvider';
import ToastComponent from 'components/common/Toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AppProvider>
        <SettingsPanelProvider>
          <ToastProvider>
            <ChatWidgetProvider>
              <BreakpointsProvider>
                <RouterProvider router={router} />
                <ToastComponent />
              </BreakpointsProvider>
            </ChatWidgetProvider>
          </ToastProvider>
        </SettingsPanelProvider>
      </AppProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
