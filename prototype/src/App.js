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
const modes =  ['baseline', 'disrupt', 'test'];

function mkActor(id) {
  return {
    id: id,
    x: window.innerWidth/2 + 100 * Math.random() , // FIXME: is dependent on props.width
    y: window.innerHeight/2 + 100 * Math.random(), // FIXME: is dependent on props.height
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
      const windowScrollY = scrollY();
      const windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      var docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      )
      var pctScrolled = Math.floor(windowScrollY/ (docHeight - windowHeight) * 100);

      if (pctScrolled < 30) { //check if the mode needs to be changed (saving expensive changes if not)
        this.setState({mode: modes[0]});
      }
      else if (pctScrolled < 60) {
        this.setState({mode: modes[1]});
      }
      else if (pctScrolled < 100) {
        this.setState({mode: modes[2]});
      }
      this.setState({ratio: Math.min(pctScrolled/100, 1)});
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
    const {data, ratio} = this.state;

    return (
      <div className="App">
        <div className="App-text-left"> 
          <button onClick={this.onReset}>reset</button>
          <Counter onScroll={() => this.setState({ratio: this.onScroll()})} text="students currently out of school:" value={ratio.toFixed(2) * 100}/> <br/> <br/>
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
