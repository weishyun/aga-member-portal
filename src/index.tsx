import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { LayoutProvider } from './hooks/layout/LayoutContext';
import { AuthProvider } from './hooks/auth/AuthContext';
import { FirebaseProvider } from './hooks/firebase/FirebaseContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  //<React.StrictMode>
  <LayoutProvider>
    <AuthProvider>
      <FirebaseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FirebaseProvider>
    </AuthProvider>
  </LayoutProvider>,
  //</React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
