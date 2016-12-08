import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
			<div className="Content"> {this.props.text} </div>
    );
  }
}

export default Content;
