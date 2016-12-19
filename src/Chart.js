import React, {Component} from 'react';
import * as d3 from 'd3';
import './App.css';
import letters from './letters';


class SvgRenderer extends Component {
  constructor() {
    super();
    this.onRef = ref => this.ref = ref;
    this.dragged = function(d) {
      d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
    };
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
    return (
      <div>
        <svg width={this.props.width/2} height={this.props.height} ref={this.onRef}>
        </svg>
      </div>
    );
  }

  renderSvg() {
    if (!this.ref) {
      return;
    }

    const svg = d3.select(this.ref);

    /*----------------------------- Main Vis --------------------*/

    const circles = svg.selectAll('path')
      .data(this.props.data, d => d.id);

    circles.enter().append('path')
      .call(d3.drag().on("drag", this.dragged));

    circles
      .attr('transform', d => 'translate('+ d.x + ',' + d.y +') scale(' + 1.2 + ')' )
      .attr('d', function(d) { return letters[d.letterID].LETTER_PATH; });

    circles.exit()
      .remove();
  }
}

export default SvgRenderer;
