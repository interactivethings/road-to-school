import React, { Component} from 'react';

class Counter extends Component {
  render() {
    return (
    	<div className="Counter"> {this.props.text} {this.props.value} </div>
    );
  }
}

export default Counter;
