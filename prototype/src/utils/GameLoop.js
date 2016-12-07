import React, { Component } from 'react';

const FPS = 30;

const GameLoop = ChildComponent => class extends Component {
  constructor() {
    super();
    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.scheduleNextTick();
  }

  componentWillUnmount() {
    this.mounted = false;
    window.cancelAnimationFrame(this.reqAnimId);
  }

  scheduleNextTick() {
    this.reqAnimId = window.requestAnimationFrame(this.tick.bind(this));
  }

  tick(time) {
    if (!this.mounted) {
      return;
    }
    this.scheduleNextTick();

    if (time - this.state.time >= 1000 / FPS) {
      this.setState({time});
    }
  }

  render() {
    return <ChildComponent {...this.props} time={this.state.time} />
  }
}

export default GameLoop;
