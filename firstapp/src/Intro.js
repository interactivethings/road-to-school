import React, { PropTypes } from 'react';

const Intro = ({children, color, changeColor}) => (
  <p className="App-intro" style={{color: color}}>
    {children} <button onClick={() => changeColor()}>Change Color</button>
  </p>
);

Intro.defaultProps = {
  color: 'black'
};
Intro.propTypes = {
  color: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired
};