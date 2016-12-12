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
    // console.log(this.props.volume)
    this.audioElement.volume = this.props.volume;
  }

  render() {
    return (
      <audio className="Audio" ref={this.onRef} controls> <source src={mp3} type="audio/mp3" /> </audio>
    );
  }
}

export default Audio;