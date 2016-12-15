import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  // We should wrap this in a Dimensions component
  <App width={window.innerWidth} height={window.innerHeight} />,
  document.getElementById('root')
);