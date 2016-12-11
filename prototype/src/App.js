import './App.css';

import React, { Component } from 'react';
// import update from 'react-update'; 
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import Chart from './Chart';
import {scrollY, passiveEvent} from './utils/dom'; 
import {contentMap, findModeAtPosition, findContentForMode, findTimepointForMode, findRatioFromPctScroll} from './ContentMap';
import Content from './Content';
import Counter from './Counter';
import Voronoi from './Voronoi';
import DateDisplay from './DateDisplay';
import Audio from './Audio';

var formatCounter = d3.format(",.2r");
var ratioRange = d3.scaleLinear().domain([0,1]).range([1000, 3100000]);
const actors = 1000;

const identity = x => x;

function mkActor(id) {

  return {
    id: id,
    x: window.innerWidth/2 * 0.7 + 100 * Math.random() , // FIXME: is dependent on props.width
    y: window.innerHeight/2* 0.7 + 100 * Math.random(), // FIXME: is dependent on props.height
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
    this.onSelectMode = this.onSelectMode.bind(this);
    this.force = d3.forceSimulation(this.state.data);
    this.onScroll = this.onScroll.bind(this);
    // this.update = update.bind(this);
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
    //constant behaviour
    const behavior = behaviours[this.state.mode] || identity;
    behavior(this.force, state.data, props);
    // this.force.restart();

    //special forces - bomb
    var bomb = behaviours['bomb'];
    this.state.pctScrolled === 27  || this.state.pctScrolled === 56  ? bomb(state.data, props) : 1;

    //special forces - perturbation
    var perturbation = behaviours['perturbation'];
    this.state.pctScrolled === 46 || this.state.pctScrolled === 53 || this.state.pctScrolled === 60 ? perturbation(state.data, props) : 1;

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
    
    this.setState({  pctScrolled: Math.floor( scrollY() / (docHeight - windowHeight) * 100) });

    var nextMode = findModeAtPosition(contentMap, this.state.pctScrolled);
    var mode = (nextMode !== undefined) ? nextMode : this.state.mode;
    for (var i = actors - 1; i >= 0; i--) {   
      var nextType = (i < findRatioFromPctScroll(this.state.pctScrolled) * actors )? 'noSchool' : 'school';
      // this.update('set', this.state.data[i].type, newType);
      this.state.data[i].type = nextType;
    }

    this.setState({ mode: mode });
  }

  render() {
    const {width, height} = this.props;
    const {data, pctScrolled} = this.state;
    var totalCount = formatCounter(ratioRange(findRatioFromPctScroll(this.state.pctScrolled)));
    return (
      <div className="App">
        <div className="App-Header"> 
          An <br/> Education
        </div>
        {/* <Audio onScroll={this.onScroll} volume={pctScrolled/100}/> */}
        <Voronoi text={"testing text for personal stories"} />
        <DateDisplay text="in" value={findTimepointForMode(contentMap, pctScrolled)} /> 
        <Counter onScroll={this.onScroll} value={totalCount}/> 
        <div className="Counter-Text">school-aged Syrian children were denied an education </div> 
        <Chart force={this.force} data={data} width={width} height={height}/>
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
