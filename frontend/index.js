import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './stylesheet.css';

// Select the root DOM node where the app will be mounted
const rootElement = document.getElementById('root');

// Create a root using React 18's createRoot API
const root = ReactDOM.createRoot(rootElement);

// Render the main App component to the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);