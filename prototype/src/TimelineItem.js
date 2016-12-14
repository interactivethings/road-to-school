import React, { Component} from 'react';

class TimelineItem extends Component {
  render() {
  	let classNames = ["TimelineItem"];
  	if (true) classNames.push("isVisible");
 	if (false) classNames.push("isHidden");

    return (
    	<div className={classNames.join(" ")}> {this.props.value} </div>
    );
  }
}

export default TimelineItem;
