import React, { Component } from 'react';
import mp3 from './assets/sound.mp3';

class Audio extends Component {

  constructor() {
    super();
    this.onRef = ref => this.audioElement = ref;
  }

  componentDidMount() {
    this.changeVolume();
  }

  componentDidUpdate(prevProps, prevState) {
    this.changeVolume();
  }

  changeVolume() {
    this.audioElement.volume  = this.props.volume > 0.02 ? Math.abs(0.8-this.props.volume) : 0;
  }

  mute() {
    console.log('clicked')
    this.audioElement.muted = false;
  }

  render() {
    return (
      <audio className="Audio" ref={this.onRef} controls loop> <source src={mp3} type="audio/mp3" /> </audio>
    );
  }
}

export default Audio;