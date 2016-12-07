import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import GameLoop from './GameLoop';
import Chart from './Chart';
import Content from './Content';

const identity = x => x;

function mkActor(id) {
  return {
    id: id,
    x: 800/2 + 100 * Math.random() , // FIXME: is dependent on props.width
    y: 600/2 + 100 * Math.random(), // FIXME: is dependent on props.height
    vx: 0,
    vy: 0,
    r: 2 * (Math.random() + 1),
    type: Math.random() < 0.9 ? 'school' : 'noSchool',
    datum: {
      text: "story of a student!",
      age: 0,
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
      this.setState({data: behavior(this.state.data, nextProps, 0.33)});
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
        <div className="App-header"></div>
        <div className="App-text-left"> 
          <Content />
          <button onClick={this.onReset}>reset</button><br/>
          <button disabled={mode === 'disrupt'} onClick={this.onSelectMode('disrupt')}>disrupt</button> 
          <span hidden> Elapsed time: {Math.round(time / 1000) + ' sec'} </span>
        </div>
        <div className="App-chart"> 
          <Chart data={data} width={width} height={height}/>
        </div>
      </div>
    );
  }
}

export default GameLoop(App);
