import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Base from './pages/app/Base';
import '../node_modules/react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';



ReactDOM.render(
  <React.StrictMode>
    <Base />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
