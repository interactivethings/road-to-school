import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './Behaviours';
import Chart from './Chart';
import Content from './Content';
import Counter from './Counter';
import {scrollY, passiveEvent} from './utils/dom'; 
import DateDisplay from './DateDisplay';
import {contentMap, findModeAtPosition, findContentForMode, findTimepointForMode} from './ContentMap';
import update from 'react-update'; 

const identity = x => x;
var formatCounter = d3.format(".0%");
var ratioRange = d3.scaleLinear()
    .domain([0,1])
    .range([0, 0.67]);
const actors = 1000;

function mkActor(id) {
  return {
    id: id,
    x: window.innerWidth/2 + 100 * Math.random() , // FIXME: is dependent on props.width
    y: window.innerHeight/2 + 100 * Math.random(), // FIXME: is dependent on props.height
    vx: 0,
    vy: 0,
    r: 2 * (Math.random() + 1),
    type: Math.random() <= 0.9 ? 'school' : 'noSchool',
    datum: {
      color: '#81A88D'
    }
  };
}

function mkInitialState() {
  return {
    data: d3.range(actors).map(mkActor),
    mode: 'baseline',
    ratio: ratioRange(0),
    pctScrolled: 0
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
    this.update = update.bind(this);
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
    behavior(this.force, state.data, props);
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
    
    this.setState({ 
      pctScrolled: Math.floor( scrollY() / (docHeight - windowHeight) * 100) 
    });
    var nextMode = findModeAtPosition(contentMap, this.state.pctScrolled);
    var mode = (nextMode !== undefined) ? nextMode : this.state.mode;
    var ratio = Math.min(this.state.pctScrolled/100, 1);

    for (var i = actors - 1; i >= 0; i--) {   
      var newType = (i < ratioRange(ratio)*actors) ? 'school' : 'noSchool';
      // this.update('set', this.state.data[i].type, newType);
      this.state.data[i].type = newType;
    }

    this.setState({
      ratio: ratioRange(ratio),
      mode: mode
    });
  }

  render() {
    const {width, height} = this.props;
    var {data, ratio, pctScrolled} = this.state;
    ratio = formatCounter(ratio);
    return (
      <div className="App">
        <div className="App-Header"> An <br/> Education</div>
        <DateDisplay text="in" value={findTimepointForMode(contentMap, pctScrolled)} /> <br/>
        <Counter onScroll={this.onScroll} value={ratio}/> <br/>
        <div className="Counter-Text"> of school-aged children were left out of school by conflict </div>
        <Chart force={this.force} data={data} width={width} height={height}/>
        <Content text={findContentForMode(contentMap, pctScrolled)} />
      </div>
    );
  }
}

export default App;
