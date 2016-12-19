import React, { Component} from 'react';

class CounterWrap extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value || this.props.isIntro !== nextProps.isIntro;
  }

  render() {
  	const className = this.props.isIntro==='intro' ? 'Counter-Wrap-isHidden' : 'Counter-Wrap';
    return (
    	<div className={className}>
    	  <div className="Counter"> {this.props.value}</div>
          <div className="Counter-text">children were denied an education</div> 
    	</div>
    );
  }
}

export default CounterWrap;
