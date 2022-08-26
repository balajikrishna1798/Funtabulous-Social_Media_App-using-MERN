import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {ToastContainer} from 'react-toastify'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
