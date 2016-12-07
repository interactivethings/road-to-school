import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
// import GameLoop from './GameLoop';
import Chart from './Chart';
import Content from './Content';
import Counter from './Counter';
import {scrollY, passiveEvent} from './dom'; //doing this correctly?? 

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
      color: '#fff'
    }
  };
}

function mkInitialState() {
  return {
    data: d3.range(500).map(mkActor),
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
      const windowScrollY = scrollY();
      const windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      var docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      )
      var pctScrolled = Math.floor(windowScrollY/ (docHeight - windowHeight) * 100);
      const nextMode = 'disrupt'; //alternating between only two states here, I have to define all of them
      
      //when user has scrolled more than 50% then the behavior changes
      if (pctScrolled > 50) { //check if the mode needs to be changed (saving expensive changes if not)
        this.setState({mode: nextMode});
      }
      this.setState({ratio: Math.min(1- pctScrolled/100, 1)});
    };
  }

  componentWillMount() {
    this.configureForce(this.props, this.state);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, passiveEvent()); // impemented from https://github.com/gut-leben-in-deutschland/bericht/blob/master/src/components/Flagship/ScrollContainer.js
  }


  componentWillUpdate(nextProps, nextState) {
    this.configureForce(nextProps, nextState);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, passiveEvent());
  }

  configureForce(props, state) {
    const behavior = behaviours[this.state.mode] || identity;
    behavior(this.force, state.data, props, state.ratio);
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
    const {width, height} = this.props;
    const {data, mode, ratio} = this.state;

    return (
      <div className="App">
        <div className="App-text-left"> 
          <button onClick={this.onReset}>reset</button>
          <button hidden disabled={mode === 'disrupt'} onClick={this.onSelectMode('disrupt')}>leave school :( </button> 
          <button hidden disabled={mode === 'baseline'} onClick={this.onSelectMode('baseline')}>go to school! :D </button> <br/><br/>
          <Counter onScroll={() => this.setState({ratio: this.onScroll()})} message="students currently out of school:" value={ratio.toFixed(2) * 100}/> <br/> <br/>
          <Content/>
        </div>
        <div className="App-chart"> 
          <Chart force={this.force} data={data} width={width} height={height}/>
        </div>
      </div>
    );
  }
}

export default App;
