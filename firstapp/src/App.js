import React, { Component, PropTypes } from 'react';
import './App.css';
import Video from './Video.js';
import {tsv} from 'd3-request';
import './Vis.css';
import {schemeCategory10, scaleOrdinal} from 'd3-scale';

const Dot = ({color}) => (<div className='Vis-dot' style={{backgroundColor: color}} />); 


class SmartDot extends Component { //-----------------Thomas's way to show an example of setState() during componentWillMount()
  componentWillMount() {
    this.setState({
      color: this.props.color
    });
  }
  render() {
    return <Dot color={this.state.color}>;
  }
}

class Vis extends Component {
  render() {
    const {data, progress} = this.props;
    const colorScale = scaleOrdinal(schemeCategory10);

    const orderedData = [].concat(data);
    if (progress > 0.5) {
      orderedData.reverse();
    }

    return (
      <div>
        {orderedData.slice(0, orderedData.length * progress).map((d, i) => (
          <SmartDot key={`${i}-${d.End}`} color={colorScale(d.End)} />
        ))}
      </div>
    );
  }
}

Vis.propTypes = {
  data: PropTypes.array.isRequired,
  progress: PropTypes.number.isRequired
}

class App extends Component {  //--------------------------------------------everything happens here
  constructor(props) {
    super(props); //---------------------------------------------------------always have that

    this.state = {
      currentTime: 0
    };
  }

  // --------------------------------- checking the lifecycle of events 
  // componentWillMount() {
  //   console.log('componentWillMount', this.props, this.state);
  // }
  // componentDidMount() {
  //   console.log('componentDidMount', this.props, this.state);
  // }
  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps', nextProps, this.props, this.state);
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate', nextProps, nextState, this.props, this.state);
  //   return true;
  // }
  // componentDidUpdate() {
  //   console.log('componentDidUpdate', this.props, this.state);
  // }
  // componentWillUnmount() {
  //   console.log('componentWillUnmount', this.props, this.state);
  // }

  componentDidMount() {
    tsv(process.env.PUBLIC_URL + 'data.tsv', (error, data) => { //-------------------------------consume the data from the tsv file using 'd3-request'
      if (error) {
        throw error;
      }
      this.setState({data}); //------------------------------------------------------------------inject data in state
    });
  }

  render() {

    const {
      duration, currentTime,
      data
    } = this.state;  //---------------------------------------------------------------------------define state object

    const hasDuration = duration !== undefined; //------------------------------------------------TRICK on controlling if value exists

    return (         /* //------------------------------------------------------------------------ !!!!! IMPORTANT !!!!!  returns a ({}) */
      <div className="App">
        <div className="App-header">
          <h2>Refugee Crisis</h2>
        </div>
        <div style={{margin: '20px 0'}}>     {/* //------------------------------------------------container for the video element */}
          <Video 
            onTimeUpdate={(currentTime) => this.setState({currentTime})} 
            onMetaData={(duration) => this.setState({duration})}/>

          {hasDuration && <p>{Math.round(currentTime / duration * 100)}%</p>}
        </div>
        <div> 
          {!!data && hasDuration && <Vis data={data} progress={currentTime / duration} />} {/* //---container for the visualisation */}
        </div>
        { /* <Intro
          color={this.state.color}
          changeColor={() => this.setState({color: ['green', 'blue', 'red'][Math.ceil(Math.random() * 2.9)]})}>
          Hello {this.state.counter}<br />
          <button onClick={() => this.setState({counter: counter + 1})}>
            Increment
          </button>
        </Intro> */ }
      </div>
    );
  }
}

export default App;
