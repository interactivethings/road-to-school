import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import GameLoop from './GameLoop';
import Chart from './Chart';

const identity = x => x;

function mkActor(id) {
  return {
    id: id,
    x: 800/2 + Math.random(), // FIXME: is dependent on props.width
    y: 600/2 + Math.random(), // FIXME: is dependent on props.height
    vx: 0,
    vy: 0,
    r: 3,
    datum: {
      type: Math.random() < 0.5 ? 'school' : 'noSchool',
      text: "story of a student!",
      age: 0,
      country: "Syria",
      color: '#3B6C73'
    }
  };
}

function mkInitialState() {
  return {
    data: d3.range(1000).map(mkActor),
    mode: 'baseline'
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = mkInitialState();

    this.onReset = this.onReset.bind(this);
    this.onSelectMode = this.onSelectMode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.time !== nextProps.time) {
      const behavior = behaviours[this.state.mode] || identity;
      this.setState({data: behavior(this.state.data, nextProps)});
    }
  }

  onReset() {
    this.setState(mkInitialState());
  }

  onSelectMode(mode) {
    return () => this.setState({mode});
  }

  render() {
    const {time, width, height} = this.props;
    const {data, mode} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h1>Kalli’s Final Project</h1>
        </div>
        <p className="App-intro">
          Elapsed time: ({Math.round(time / 1000) + 's'})
          <br />
          <button onClick={this.onReset}>reset</button>
          <button disabled={mode === 'fallDown'} onClick={this.onSelectMode('fallDown')}>fallDown</button>
          <button disabled={mode === 'collapse'} onClick={this.onSelectMode('collapse')}>collapse to center</button>
          {/* <button disabled={mode === 'baseline'} onClick={this.onSelectMode('baseline')}>baseline</button> */}
        </p>
        <Chart data={data} width={width} height={height} />
      </div>
    );
  }
}

export default GameLoop(App);
