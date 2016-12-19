import React, { Component } from 'react';
import mp3 from './assets/audio.mp3';

class Audio extends Component {

  constructor() {
    super();
    this.onRef = ref => this.audioElement = ref;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.muted !== nextProps.muted || this.props.volume !== nextProps.volume;
  }

  componentDidMount() {
    this.changeVolume();
  }

  componentDidUpdate(prevProps, prevState) {
    this.changeVolume();
  }

  changeVolume() {
    this.audioElement.volume  = this.props.volume > 0.02 ? Math.abs(0.9-this.props.volume) : 0;
  }

  render() {
    return (
      <audio className="Audio" ref={this.onRef} controls autoPlay muted={this.props.muted} loop> <source src={mp3} type="audio/mp3" /> </audio>
    );
  }
}

export default Audio;
