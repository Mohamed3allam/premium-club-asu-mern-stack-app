import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './App/context/AuthContext';
import { AuthContextProviderD } from './DashboardApp/context/AuthContext';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import { UsersContextProvider } from './DashboardApp/context/UsersContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <AuthContextProviderD>
      <UsersContextProvider>
        <React.StrictMode>
          <Root />
        </React.StrictMode>
      </UsersContextProvider>
    </AuthContextProviderD>
  </AuthContextProvider>
);

reportWebVitals();