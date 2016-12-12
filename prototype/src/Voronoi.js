import React, { Component} from 'react';

class Voronoi extends Component {

	render() {

		// this.onSelect(...)
		//<div onHover={(...) => this.onSelect(d.id)} className="Voronoi"> {this.props.text} </div>
		
		return (
			<div className="Voronoi"> {this.props.text} </div>
		);
	}
}

export default Voronoi;
