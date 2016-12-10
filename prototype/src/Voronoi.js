import React, { Component} from 'react';

class Voronoi extends Component {
	 
	constructor() {
	super();
  	this.state = {
		isHidden: true
		};
	}

	toggleHidden() {
		this.setState({
	  	isHidden: this.state.isHidden ? false : true
		});
	}

	render() {
	return (
		<div className="Voronoi"> {this.props.text} </div>
	);
	}
}

export default Voronoi;
