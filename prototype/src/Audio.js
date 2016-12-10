import React, { Component } from 'react';
import mp3 from './sound.mp3';

class Audio extends Component {
  
  componentDidMount() {
    this.ref.addEventListener('volumechange', () => {
      console.log(this.ref.volume);
    }, true);
  }

  render() {
    return (
      <audio ref={ref => { this.ref = ref; }} controls autoPlay> <source src={mp3} type="audio/mp3"/> </audio>
    );
  }
}

export default Audio;