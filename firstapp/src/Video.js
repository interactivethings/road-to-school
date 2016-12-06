import React, { Component } from 'react';
import mp4 from '../video.mp4';

class Video extends Component {
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
      <video ref={ref => { this.ref = ref; }} controls>
        <source src={mp4} type="video/mp4"/> 
      </video>
    );
  }
}

export default Video;
