import './App.css';

import React, { Component } from 'react';
import * as d3 from 'd3';
import * as behaviours from './behaviours';
import {compose, shuffle, throttle, uniq} from 'underscore';
import {mkInitialState, mkActor, advanceBombState} from './state';
import Chart from './Chart';
import {scrollY, passiveEvent, windowHeight, docHeight} from './utils/dom';
import {contentMap, findModeAtPosition, findTimepointForMode, findRatioFromPctScroll} from './ContentMap';
import Content from './Content';
import CounterWrap from './CounterWrap';
import TimelineItem from './TimelineItem';
import Audio from './Audio';
import Credits from './Credits';
import Share from './Share';

// Constants
const ACTOR_COUNT = 200;
const ACTOR_ROLES = shuffle(d3.range(ACTOR_COUNT).map((d,i) => i)); // [3, 2, 6, 1, 4]
const FALLING_ID = 10;
const QUOTE_A_ID = 11;
const QUOTE_B_ID = 12;

// Helpers
const identity = x => x;
const formatCounter = d3.format(",");
const ratioRange = d3.scaleLinear().domain([0,1]).range([1000, 2800000]);
const uniqueDates = uniq(contentMap.map((d) => d.timepoint));
const totalCount = compose(formatCounter, ratioRange, findRatioFromPctScroll);

class App extends Component {
  constructor() {
    super();

    const cols = 10;
    const rows = ACTOR_COUNT / cols;
    const state = mkInitialState(
      ACTOR_COUNT,
      mkActor(cols, rows, window.innerWidth / 2, window.innerHeight - 250 /* bottom padding */)
    );

    state.data[FALLING_ID].type = 'falling';
    state.data[QUOTE_A_ID].quote_A = true;
    state.data[QUOTE_B_ID].quote_B = true;       
    state.data[QUOTE_A_ID].type = 'noSchool';
    state.data[QUOTE_B_ID].type = 'noSchool';  

    this.state = state;
    this.force = d3.forceSimulation(this.state.data);
    this.onSelectMode = this.onSelectMode.bind(this);
    this.onScroll = throttle(this.onScroll.bind(this), 100);
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
    this.setState({audioMuted: !this.state.audioMuted})
  }

  onSelectMode(mode) {
    return () => this.setState({mode});
  }

  onScroll() {
    var nextPctScrolled = Math.floor( scrollY() / (docHeight() - windowHeight()) * 100);

    if (this.state.pctScrolled !== nextPctScrolled) {
      var nextMode = findModeAtPosition(contentMap, this.state.pctScrolled);
      var mode = (nextMode !== undefined) ? nextMode : this.state.mode;
      var ratio = findRatioFromPctScroll(this.state.pctScrolled);
      for (var i = ACTOR_COUNT - 1; i >= 0; i--) {
        var currentType = this.state.data[ACTOR_ROLES[i]].type;
        if (currentType !== 'falling' && !this.state.data[ACTOR_ROLES[i]].quote_A && !this.state.data[ACTOR_ROLES[i]].quote_B)  {
          var nextType = (i < ratio * ACTOR_COUNT) ? 'noSchool' : 'school';
          this.state.data[ACTOR_ROLES[i]].type = nextType;
        }
      }

      this.setState({ mode: mode, pctScrolled: nextPctScrolled });
    }
  }

  render() {
    const {width, height} = this.props;
    const {data, pctScrolled, audioMuted, mode} = this.state;

    return (
      <div>
        <div className="App">
          <div className="App-Intro">
            {/* -------------------- Title -----------------------*/}
            <div className="App-Intro-Title"> The <br/>road to school </div>
            <div className="App-Intro-Subtitle"> The Syrian conflict is robbing millions of children of their right to education. </div>
            <div className="App-Intro-Explanation"> Every word in the visualization corresponds to roughly 10,000 Syrian children. </div>
          </div>
          {/* -------------------- Header -----------------------*/}
          <div className="App-Header-Title"> The Road to School</div> 
          <div className="App-Header-Share">
            <Share />
          </div>
          {/* -------------------- Audio -----------------------*/}
          <div className="App-Header-Audio"> 
            <Audio volume={pctScrolled/100} muted={audioMuted} onClick={this.toggleAudio}/> 
          </div>
          {/* -------------------- Timeline -----------------------*/}
          <div className="Timeline-Wrap"> 
            <div className="Timeline"> 
                {uniqueDates.map((d,i) => <TimelineItem key={i} id={i} value={findTimepointForMode(contentMap, pctScrolled)} isVisible={findTimepointForMode(contentMap, pctScrolled) === d} />)}  
            </div>
          </div>
          {/* -------------------- Counter Wrap-----------------------*/}
          <CounterWrap onScroll={this.onScroll} value={totalCount(this.state.pctScrolled)} isIntro={mode}/>
          {/* -------------------- Content -----------------------*/}
          <ContentText />
          {/* -------------------- Chart -----------------------*/}
          <Chart mode={mode} force={this.force} data={data} width={width} height={height}/>
          <div className="Content-Gradient"></div>
        </div>
        <div className="App-Fallback"> 
            <div className="App-Fallback-Title "> The road to school </div>
            <div className="App-Fallback-Text"> This visualization is built for desktop. Click <a href="mailto:?&subject=The%20Road%20to%20School%20link&body=https://lab.interactivethings.com/road-to-school/">here</a> to send the link via email.
            </div>  
          <div className="App-Fallback-Logo">  </div>  
        </div>
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
