import React, { Component} from 'react';

class Timeline extends Component {
  render() {
  	const className = this.props.isVisible ? 'Timeline-Item' : 'TimelineItem-isHidden';
	return (
			<div className={className}> {this.props.value} </div>
    	);
	}
}

export default Timeline;
