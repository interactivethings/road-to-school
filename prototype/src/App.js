import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import Chart from './Chart';
import {scrollY, passiveEvent} from './utils/dom'; 
import {contentMap, findModeAtPosition, findTimepointForMode, findRatioFromPctScroll} from './ContentMap';
import Content from './Content';
import CounterWrap from './CounterWrap';
import TimelineItem from './TimelineItem';
import Audio from './Audio';
import Credits from './Credits';
import {shuffle} from './utils/forceHelpers';

var formatCounter = d3.format(",");
var ratioRange = d3.scaleLinear().domain([0,1]).range([1000, 2800000]);
const actors = 200;  
var actorsRoles = [];
for (var i = actors - 1; i >= 0; i--) { actorsRoles[i] = i; } 
actorsRoles = shuffle(actorsRoles);

const identity = x => x;
function mkActor(id) {

  return {
    id: id,
    x: window.innerWidth/10, // FIXME: is dependent on props.width
    y: 10, // FIXME: is dependent on props.height
    vx: 0,
    vy: 0,
    letterID: Math.floor(Math.random() * 4),
    type: 'school'
  };
}

function mkInitialState() {
  return {
    data: d3.range(actors).map(mkActor),
    mode: 'intro',
    pctScrolled: 0,
    bombActivity: undefined,
    audioMuted: false
  }
}


var GLOBAL_UGLYNESS = [];

function daBomb(id, run, done) {
  let counter = 0;

  if (GLOBAL_UGLYNESS.indexOf(id) === -1) {
    GLOBAL_UGLYNESS = GLOBAL_UGLYNESS.concat(id);
  } else {
    console.log('Already ran')
    return;
  }

  function doTimeout() {
    return setTimeout(function() {
      counter++;
      if (counter < 2) {
        console.log("RUN")
        run();
        doTimeout();
      } else {
        console.log("donedone")
        done();
      }
    }, 50);
  }
  
  doTimeout();

  return {
    id: id,
  }
}



class App extends Component {
  constructor() {
    super();
    this.state = mkInitialState();
    var dataChunk = 10;
    // for small screens: 34
    //for big screens: 60
    var heightUnit = window.innerWidth > 1600 ? 42: 22;
    var widthUnit = window.innerWidth*0.5/15;

    for (var j=1; j<=20; j++) { 
      for (var i = (j-1)*dataChunk; i< j*dataChunk; ++i) {
          this.state.data[i].x = this.state.data[i].x+  (i-(j-1)*dataChunk)* widthUnit;
          this.state.data[i].y = this.state.data[i].y + (j)*heightUnit;
          this.state.data[i].x0 = this.state.data[i].x;
          this.state.data[i].y0 = this.state.data[i].y;
      }   
    }

    this.onSelectMode = this.onSelectMode.bind(this);
    this.force = d3.forceSimulation(this.state.data);
    this.onScroll = this.onScroll.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
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
    this.force.restart();

    //special forces - bomb
    var bomb = behaviours['bomb'];

    if (!this.state.bombActivity && this.state.pctScrolled === 17 && GLOBAL_UGLYNESS.indexOf(17) === -1) {
      this.setState({
        bombActivity: daBomb(17, () => bomb(state.data, props), () => this.setState({bombActivity: undefined}) )
      })
    }

    if (!this.state.bombActivity && this.state.pctScrolled === 32 && GLOBAL_UGLYNESS.indexOf(32) === -1) {
      this.setState({
        bombActivity: daBomb(32, () => bomb(state.data, props), () => this.setState({bombActivity: undefined}) )
      })
    }


    // special forces - perturbation
    var perturbation = behaviours['perturbation'];
    if (this.state.pctScrolled === 74) perturbation(state.data, props); 

  }

  toggleAudio() {
    this.setState({audioMuted: !this.state.audioMuted})
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
      var nextType = (i < findRatioFromPctScroll(this.state.pctScrolled) * actors) ? 'noSchool' : 'school';
      this.state.data[actorsRoles[i]].type = nextType;
    }

    this.setState({ mode: mode });
  }

  render() {
    const {width, height} = this.props;
    const {data, pctScrolled, audioMuted, mode} = this.state;
    console.log(mode)
    var totalCount = formatCounter(ratioRange(findRatioFromPctScroll(this.state.pctScrolled)));
    let _ = require('underscore');
    let uniqueDates = _.uniq(contentMap.map((d) => d.timepoint));

    return (
      <div className="App">
        <div className="App-Intro">
        {/* -------------------- Title -----------------------*/}
          <div className="App-Intro-Text"> An Education </div>
        </div>
        {/* -------------------- Header -----------------------*/}
        <div className="App-Header-Share"> </div>
        <div className="App-Header-Audio" onClick={this.toggleAudio}> 
        {/* -------------------- Audio -----------------------*/}
          <Audio volume={pctScrolled/100} muted={audioMuted}/> 
        </div>

        {/* -------------------- Timeline -----------------------*/}
        <div className="Timeline"> 
            {uniqueDates.map((d,i) => <TimelineItem key={i} value={findTimepointForMode(contentMap, pctScrolled)} isVisible={true} />)}  
        </div>
        {/* -------------------- Counter Wrap-----------------------*/}
        <CounterWrap  onScroll={this.onScroll} value={totalCount} isIntro={mode}/>
        {/* -------------------- Content -----------------------*/}
        <div className="Content-Wrap"> 
          {contentMap.map((d,i) => <Content key={i} text={d.text} isQuote={d.styleAsQuote} />)}
        {/* -------------------- Credits -----------------------*/}
          <Credits className="Credits"/>
        </div>
        {/* -------------------- Chart -----------------------*/}
        <Chart force={this.force} data={data} width={width} height={height}/>
      </div>
    );
  }
}

export default App;
