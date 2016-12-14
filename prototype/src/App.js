import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import {mkInitialState, advanceBombState} from './state';
import Chart from './Chart';
import {scrollY, passiveEvent} from './utils/dom'; 
import {contentMap, findModeAtPosition, findTimepointForMode, findRatioFromPctScroll} from './ContentMap';
import Content from './Content';
import CounterWrap from './CounterWrap';
import TimelineItem from './TimelineItem';
import Audio from './Audio';
import Credits from './Credits';
import {shuffle} from './utils/forceHelpers';

// Constants
const ACTOR_COUNT = 200;
const ACTOR_ROLES = shuffle(d3.range(ACTOR_COUNT).map((d,i) => i)); // [3, 2, 6, 1, 4]
const fallingID = 5;

// Helpers
const identity = x => x;
const formatCounter = d3.format(",");
const ratioRange = d3.scaleLinear().domain([0,1]).range([1000, 2800000]);

class App extends Component {
  constructor() {
    super();
    this.state = mkInitialState(ACTOR_COUNT);
    this.state.data[fallingID].type = 'falling';

    var dataChunk = 10;
    var heightUnit = window.innerWidth > 1600 ? 42: 22;   // for small screens: 34 //for big screens: 60
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
    const behavior = behaviours[state.mode] || identity;
    behavior(this.force, state.data, props);
    this.force.restart();

    // special forces - bomb
    const [nextBombStates, needsUpdate] = advanceBombState(state.bombStates, state.pctScrolled);
    nextBombStates.forEach((b, i) => {
      if (b.status === 'ignited') {
        behaviours['bomb'](state.data, props);
      }
    });
    if (needsUpdate) {
      this.setState({ bombStates: nextBombStates });
    }

  }

  toggleAudio() {
    d3.select('.App-Header-Audio').classed('App-Header-Audio-Muted', !this.state.audioMuted);
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
    for (var i = ACTOR_COUNT - 1; i >= 0; i--) {   
      var currentType = this.state.data[ACTOR_ROLES[i]].type;
      if (currentType !== 'falling')  {
        var nextType = (i < findRatioFromPctScroll(this.state.pctScrolled) * ACTOR_COUNT) ? 'noSchool' : 'school';
        this.state.data[ACTOR_ROLES[i]].type = nextType;
      }
    }

    this.setState({ mode: mode });
  }

  render() {
    const {width, height} = this.props;
    const {data, pctScrolled, audioMuted, mode} = this.state;
    var totalCount = formatCounter(ratioRange(findRatioFromPctScroll(this.state.pctScrolled)));
    let _ = require('underscore');
    let uniqueDates = _.uniq(contentMap.map((d) => d.timepoint));

    return (
      <div className="App">
        <div className="App-Intro">
        {/* -------------------- Title -----------------------*/}
          <div className="App-Intro-Title"> The <br/>road to school </div>
          <div className="App-Intro-Subtitle"> The Syrian conflict is robbing millions of children of their right to education. </div>

        </div>
        {/* -------------------- Header -----------------------*/}
        <div className="App-Header-Share"> </div>
        {/* -------------------- Audio -----------------------*/}
        <div className="App-Header-Audio" onClick={this.toggleAudio}> 
          <Audio volume={pctScrolled/100} muted={audioMuted}/> 
        </div>

        {/* -------------------- Timeline -----------------------*/}
        <div className="Timeline-Wrap"> 
          <div className="Timeline"> 
              {uniqueDates.map((d,i) => <TimelineItem key={i} id={i} value={findTimepointForMode(contentMap, pctScrolled)} isVisible={findTimepointForMode(contentMap, pctScrolled) === d} />)}  
          </div>
        </div>
        {/* -------------------- Counter Wrap-----------------------*/}
        <CounterWrap onScroll={this.onScroll} value={totalCount} isIntro={mode}/>
        {/* -------------------- Content -----------------------*/}
        <ContentText />
        {/* -------------------- Chart -----------------------*/}
        <Chart force={this.force} data={data} width={width} height={height}/>
        <div className="Content-Gradient"></div>
      </div>
    );
  }
}

class ContentText extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="Content-Wrap">
        {contentMap.map((d,i) => <Content key={i} text={d.text} isQuote={d.styleAsQuote} />)}
        <Credits className="Credits"/>
      </div>
    )
  }
}

export default App;
