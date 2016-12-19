import React, { Component} from 'react';

class Counter extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    return (
    	<div className="Counter">  {this.props.value} </div>
    );
  }
}

export default Counter;
