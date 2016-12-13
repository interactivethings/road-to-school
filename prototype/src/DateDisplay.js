import React, { Component} from 'react';

class DateDisplay extends Component {
  render() {
  	let classNames = ["DateDisplay"];
  	if (true) classNames.push("isVisible");
 	if (false) classNames.push("isHidden");

    return (
    	<div className={classNames.join(" ")}> {this.props.value} </div>
    );
  }
}

export default DateDisplay;
