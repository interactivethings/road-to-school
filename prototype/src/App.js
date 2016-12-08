import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import Chart from './Chart';
import Content from './Content';
import Counter from './Counter';
import {scrollY, passiveEvent} from './utils/dom'; 
import DateDisplay from './DateDisplay';
import {contentMap, findModeAtPosition, findContentForMode} from './ContentMap';

const identity = x => x;
var formatCounter = d3.format(".0%");
var ratioRange = d3.scaleLinear()
    .domain([0,1])
    .range([0.10, 0.67]);

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
      color: '#009593'
    }
  };
}

function mkInitialState() {
  return {
    data: d3.range(1000).map(mkActor),
    mode: 'baseline',
    ratio: ratioRange(0),
    timepoint: 2012
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = mkInitialState();
    this.onReset = this.onReset.bind(this);
    this.onSelectMode = this.onSelectMode.bind(this);
    this.force = d3.forceSimulation(this.state.data);
    this.onScroll = this.onScroll.bind(this);
  }

  componentWillMount() {
    this.configureForce(this.props, this.state);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, passiveEvent());
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

  onScroll() {
      var windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      var docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      var pctScrolled = Math.floor( scrollY() / (docHeight - windowHeight) * 100);

      var nextMode = findModeAtPosition(contentMap, pctScrolled);
      var mode = (nextMode !== undefined) ? nextMode : this.state.mode;
      var ratio = Math.min(pctScrolled/100, 1);
      this.setState({
        ratio: ratio,
        mode: mode
      });
  }

  render() {
    const {width, height} = this.props;
    var {data, ratio, mode, timepoint} = this.state;
    ratio = formatCounter(ratio); 

    return (
      <div className="App">
        <DateDisplay text="Year is" value={timepoint} />
        <Counter onScroll={this.onScroll} text="students currently out of school" value={ratio}/>
        <Content text={findContentForMode(contentMap, mode)} />
        <Chart force={this.force} data={data} width={width} height={height}/>
      </div>
    );
  }
}

export default App;
