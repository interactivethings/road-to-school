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
    data: d3.range(300).map(mkActor),
    mode: 'baseline',
    ratio: 0.9
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = mkInitialState();

    this.onReset = this.onReset.bind(this);
    this.onSelectMode = this.onSelectMode.bind(this);
    this.force = d3.forceSimulation(this.state.data);
    this.onScroll = () => {
      console.log('scroll', window.pageYOffset);
      const mode = 'x'; //define the next mode when I have it
      if (mode !== this.state.mode) { //check if the mode needs to be changed (saving expensive changes if not)
        this.setState({mode});
      }
    };
  }

  componentWillMount() {
    this.configureForce(this.props, this.state);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll); // impement passiveEvent() from https://github.com/gut-leben-in-deutschland/bericht/blob/master/src/components/Flagship/ScrollContainer.js
  }

  componentWillUpdate(nextProps, nextState) {
    this.configureForce(nextProps, nextState);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  configureForce(props, state) {
    behaviours[state.mode](this.force, state.data, props, state.ratio);
    this.force.restart();
  }

  onReset() {
    const state = mkInitialState();
    this.setState(state);
    this.force = d3.forceSimulation(state.data);
  }

  onSelectMode(mode) {
    return () => this.setState({mode});
  }

  render() {
    const {time, width, height} = this.props;
    const {data, mode, ratio} = this.state;

    return (
      <div className="App">
        <div className="App-header"></div>
        <div className="App-text-left"> 
          <Content />
          <button onClick={this.onReset}>reset</button><br/>
          <button disabled={mode === 'disrupt'} onClick={this.onSelectMode('disrupt')}>leave school :( </button> <br/>
          <button disabled={mode === 'baseline'} onClick={this.onSelectMode('baseline')}>go to school! :D </button> <br/>
          Ratio: {ratio.toFixed(2)}{' '}
          <button disabled={ratio === 0} onClick={() => this.setState({ratio: Math.max(0, ratio - 0.05)})}>-</button> 
          <button disabled={ratio === 1} onClick={() => this.setState({ratio: Math.min(1, ratio + 0.05)})}>+</button>
        </div>
        <div className="App-chart"> 
          <Chart force={this.force} data={data} width={width} height={height}/>
        </div>
      </div>
    );
  }
}

export default App;
