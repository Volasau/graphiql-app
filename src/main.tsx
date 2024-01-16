import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/contextLanguage';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import { UserProvider } from './context/authContext';
import { LoginProvider } from './context/loginContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <LanguageProvider>
          <UserProvider>
            <LoginProvider>
              <App />
            </LoginProvider>
          </UserProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
