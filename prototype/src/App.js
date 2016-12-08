import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import Chart from './Chart';
import Content from './Content';
import Counter from './Counter';
import {scrollY, passiveEvent} from './utils/dom'; 
import contentMap from './ContentMap';
import DateDisplay from './DateDisplay';

const identity = x => x;
var formatCounter = d3.format(".0%");
var ratioRange = d3.scaleLinear()
    .domain([0,1])
    .range([0.33, 0.67]);

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
    this.onScroll = () => { 

      var windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      var docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      var pctScrolled = Math.floor( scrollY() / (docHeight - windowHeight) * 100);

      function findMode(item) {
        return item.changeAt === pctScrolled;
      }
      var nextMode = contentMap.find(findMode);
      if (nextMode !== undefined) this.setState({mode: nextMode.mode})
      
      // for (var i = this.state.data.length - 1; i >= 0; i--) {
        //   this.state.data[i] = (i < ratio) ? 'school' : 'noSchool';
      // }
        
      this.setState({ratio: ratioRange(Math.min(pctScrolled/100, 1))});
    };
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

  render() {
    const {width, height} = this.props;
    var {data, ratio, mode, timepoint} = this.state;

    ratio = formatCounter(ratio); 
    function findContent(item) {
      return item.mode === mode;
    }

    return (
      <div className="App">
          <DateDisplay text="Year is" value={timepoint} />
          <Counter onScroll={() => this.setState({ratio: this.onScroll()})} text=" of children are out of school" value={ratio}/>
          <div className="App-Content"> 
            <Content text={contentMap.find(findContent).text} />
          </div>
          <Chart force={this.force} data={data} width={width} height={height}/>
      </div>
    );
  }
}

export default App;
