import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Dimensions from 'react-dimensions'
import {windowHeight} from './utils/dom';

const ResizingApp = Dimensions({
  getHeight: windowHeight
})(App);

ReactDOM.render(
  <ResizingApp />,
  document.getElementById('root')
);
