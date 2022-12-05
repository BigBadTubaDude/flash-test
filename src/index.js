import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './_components/App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa6jFXexqYCwwfr1krWqN8T6BhJ7jpXR0",
  authDomain: "paintdefectapp.firebaseapp.com",
  projectId: "paintdefectapp",
  storageBucket: "paintdefectapp.appspot.com",
  messagingSenderId: "445947311255",
  appId: "1:445947311255:web:3e620291bcda9ce44ca5d2",
  measurementId: "G-V8MNM2YM66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Flash Test data input page
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
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
