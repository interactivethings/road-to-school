import React, { Component} from 'react';
import {TimelineItem} from './TimelineItem';

class Timeline extends Component {
  render() {
		var items = this.props.eventData.map(function(item, index) {
			console.log(index)
			return ( <TimelineItem key={index}  eventDate={item.timepoint} />
			);
		});
		// return (
		// 	<ul className="timeline">
		//  		{items}
		// 	</ul>
		// );
	}
}

export default Timeline;
