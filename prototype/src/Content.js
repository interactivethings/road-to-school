import React, { Component } from 'react';

class Content extends Component {
  render() {
  	const className = this.props.isQuote ? 'Content-Quote' : 'Content';
    return (
			<div className={className}> {this.props.text} </div>
    );
  }
}

export default Content;
