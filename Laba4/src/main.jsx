import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Импортируем Provider
import store from './redux/store'; // Импортируем Redux store
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {}
    <App />
  </Provider>
);
