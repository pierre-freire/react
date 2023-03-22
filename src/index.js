import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const fontAwesome = document.createElement('script')
fontAwesome.setAttribute('src', "https://kit.fontawesome.com/ab1e24215c.js")
fontAwesome.setAttribute('crossirigin', "anonymous")

const viewPort = document.createElement('meta')
viewPort.setAttribute('content', "width=device-width", "height=device-height", "initial-scale=1")
viewPort.setAttribute('name', "viewport")

document.head.insertAdjacentElement('beforeend', fontAwesome)
document.head.insertAdjacentElement('beforeend', viewPort)

root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
