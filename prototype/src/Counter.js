import React, { Component} from 'react';

class Counter extends Component {
  render() {
    return (
    	<div className="Counter">  {this.props.value} {this.props.text} </div>
    );
  }
}

export default Counter;
