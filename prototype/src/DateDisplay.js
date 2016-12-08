import React, { Component} from 'react';

class DateDisplay extends Component {
  render() {
    return (
    	<div className="DateDisplay"> {this.props.text}  {this.props.value} </div>
    );
  }
}

export default DateDisplay;
