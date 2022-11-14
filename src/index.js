import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FlashApp from './_components/FlashApp';
import PaintApp from './'
import reportWebVitals from './reportWebVitals';

//Flash Test data input page
const flashRoot = ReactDOM.createRoot(document.getElementById('flash'));
flashRoot.render(
  <React.StrictMode>
    <FlashApp />
  </React.StrictMode>
);
//Paint defect data input page
// const paintRoot = ReactDOM.createRoot(document.getElementById('paint'));
// paintRoot.render(
//   <React.StrictMode>
//     <h1>dfdf</h1>
//   </React.StrictMode>
// )
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
