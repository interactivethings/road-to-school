import React, { Component } from 'react';
import mp3 from './sound.mp3';

class Audio extends Component {
  
  componentDidMount() {

    this.ref.addEventListener('loadedmetadata', () => {
      // console.log(this.ref.duration);
      this.props.onMetaData(this.ref.duration);
    }, true);
    
    this.ref.addEventListener('timeupdate', () => {
      // console.log(this.ref.currentTime);
      this.props.onTimeUpdate(this.ref.currentTime);
    }, true);
  }

  render() {
    return (
      <audio ref={ref => { this.ref = ref; }} controls> <source src={mp3} type="audio/mp3"/> </audio>
    );
  }
}

export default Audio;