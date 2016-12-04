import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  // We should wrap this in a Dimensions component
  <App width={800} height={600} />,
  document.getElementById('root')
);
