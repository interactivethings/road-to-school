import React, { Component } from 'react';
import mp3 from './sound.mp3';

class Audio extends Component {

  constructor() {
    super();
    this.onRef = ref => this.ref = ref;
    this.volume = 0;
  }

  componentDidMount() {
    this.changeVolume();
  }

  componentDidUpdate(prevProps, prevState) {
    this.changeVolume();
  }

  changeVolume() {
    console.log(this.props.volume)
    this.volume = this.props.volume;
  }

  render() {
    return (
      <audio ref={this.onRef} controls> <source src={mp3} type="audio/mp3" /> </audio>
    );
  }
}

export default Audio;