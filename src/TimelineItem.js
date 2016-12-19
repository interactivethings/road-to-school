import React, { Component} from 'react';

class TimelineItem extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isVisible !== nextProps.isVisible;
  }

  render() {
  	const className = this.props.isVisible ? 'TimelineItem' : 'TimelineItem-isHidden';
    return (
    	<div className={className}> {this.props.value} </div>
    );
  }
}

export default TimelineItem;
