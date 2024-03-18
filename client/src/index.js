import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
