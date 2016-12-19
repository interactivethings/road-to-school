import React, {Component} from 'react';
import * as d3 from 'd3';
import './App.css';
import letters from './letters';


class SvgRenderer extends Component {
  constructor() {
    super();
    this.onRef = ref => this.ref = ref;
    this.onDrag = d3.drag().on("drag", (d) => {
      d.x = d3.event.x;
      d.y = d3.event.y;
    });
  }

  componentDidMount() {
    this.renderSvg();
    this.props.force.on('tick', () => {
      this.renderSvg();
    });
  }

  componentWillUnmount() {
    this.props.force.on('tick', null);
  }

  render() {
    return <svg width={this.props.width/2} height={this.props.height} ref={this.onRef} />;
  }

  renderSvg() {
    if (!this.ref) {
      return;
    }

    const svg = d3.select(this.ref);

    /*----------------------------- Main Vis --------------------*/

    const actors = svg.selectAll('path')
      .data(this.props.data, d => d.id);

    actors.enter().append('path')
      .attr('d', (d) => letters[d.letterID].LETTER_PATH)
      .call(this.onDrag);

    actors
      .attr('transform', d => 'translate('+ d.x + ',' + d.y +') scale(' + 1.2 + ')' );

    actors.exit()
      .remove();
  }
}

export default SvgRenderer;
