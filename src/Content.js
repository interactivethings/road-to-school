import React, { Component } from 'react';

class Content extends Component {
  render() {
  	const className = this.props.isQuote ? 'Content-Quote' : 'Content';
    return (
			<div className={className} dangerouslySetInnerHTML={{__html: this.props.text}} />
    );
  }
}

export default Content;
