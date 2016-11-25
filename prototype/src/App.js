import React, { Component } from 'react';
import './App.css';
import Chart from './Chart.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>hallo</h3>
        </div>
        <p className="App-intro">
          Kalli is learning react
        </p>

        {
          <Chart>
          </Chart>
        }
      </div>
    );
  }
}

export default App;
