import React, { Component} from 'react';

class CounterWrap extends Component {
  render() {
  	const className = this.props.isCounterHidden ? 'Counter-Wrap-isHidden' : 'Counter-Wrap';
    return (
    	<div className="Counter-Wrap">
    	  <div className="Counter"> {this.props.value}</div>
          <div className="Counter-text">children were denied an education</div> 
    	</div>
    );
  }
}

export default CounterWrap;
