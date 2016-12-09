import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import Chart from './Chart';
import Content from './Content';
import Counter from './Counter';
import Voronoi from './Voronoi';
import {scrollY, passiveEvent} from './utils/dom'; 
import DateDisplay from './DateDisplay';
import {contentMap, findModeAtPosition, findContentForMode, findTimepointForMode, findRatioFromPctScroll} from './ContentMap';
import update from 'react-update'; 

var formatCounter = d3.format(",.2r");
var ratioRange = d3.scaleLinear().domain([0,1]).range([10, 3100000]);
const actors = 1000;

const identity = x => x;

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
    pctScrolled: 0
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = mkInitialState();
    // this.onReset = this.onReset.bind(this);
    this.onSelectMode = this.onSelectMode.bind(this);
    this.force = d3.forceSimulation(this.state.data);
    // this.bombForce = d3.forceSimulation(this.state.data);
    this.onScroll = this.onScroll.bind(this);
    this.update = update.bind(this);
  }

  componentWillMount() {
    this.configureForce(this.props, this.state);
    // this.configureBombForce(this.props, this.state);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, passiveEvent());
  }


  componentWillUpdate(nextProps, nextState) {
    this.configureForce(nextProps, nextState);
    // this.configureBombForce(nextProps, nextState);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, passiveEvent());
  }

  configureForce(props, state) {
    const behavior = behaviours[this.state.mode] || identity;
    behavior(this.force, state.data, props);
    // this.force.restart();
  }

  configureBombForce(props, state) {
    const behavior = behaviours['bombForce'] || identity;
    behavior(this.bombForce, state.data, props);
    this.bombForce.restart();
  }

  // onReset() {
  //   const state = mkInitialState();
  //   this.setState(state);
  //   this.force = d3.forceSimulation(state.data);
  //   this.bombForce = d3.forceSimulation(state.data);
  // }

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
    for (var i = actors - 1; i >= 0; i--) {   
      var nextType = (i < findRatioFromPctScroll(this.state.pctScrolled) * actors )? 'school' : 'noSchool';
      // this.update('set', this.state.data[i].type, newType);
      this.state.data[i].type = nextType;
    }

    this.setState({
      mode: mode
    });
  }

  render() {
    const {width, height} = this.props;
    var {data, pctScrolled} = this.state;
    var totalCount = formatCounter(ratioRange(findRatioFromPctScroll(this.state.pctScrolled)));
    return (
      <div className="App">
        <div className="App-Header"> 
          An <br/> Education
        </div>
        <DateDisplay text="in" value={findTimepointForMode(contentMap, pctScrolled)} />
        <Counter onScroll={this.onScroll} value={totalCount}/> 
        <div className="Counter-Text">school-aged Syrian children were denied an education </div>
        <Voronoi className="Voronoi-Text" text={"this will be the Voronoi text"} />
        <Chart force={this.force} bombForce={this.bombForce} data={data} width={width} height={height}/>
        <div className="Content-Wrap"> 
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
          <Content text={findContentForMode(contentMap, pctScrolled)} />
        </div>
      </div>
    );
  }
}

export default App;
