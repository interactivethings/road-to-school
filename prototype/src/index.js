import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  // We should wrap this in a Dimensions component
  <App width={1200} height={800} />,
  document.getElementById('root')
);
