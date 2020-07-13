import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserProvider from './context/UserProvider'
import BooksProvider from './context/BooksProvider'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BooksProvider>
        <App />
      </BooksProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

