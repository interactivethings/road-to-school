import './App.css';

import React, {Component} from 'react';
// import DOM from 'react-dom';
import * as d3 from 'd3';

class SvgRenderer extends Component {
  constructor() {
    super();
    this.onRef = ref => this.ref = ref;
  }
  componentDidMount() {
    this.renderSvg();
    this.props.force.on('tick', () => {
      this.renderSvg();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderSvg();
  }

  componentWillUnmount() {
    this.props.force.on('tick', null);
  }

  render() {
    const {width, height} = this.props;
    return (
      <svg width={width} height={height} ref={this.onRef} />
    );
  }

  renderSvg() {
    if (!this.ref) {
      return;
    }
    const svg = d3.select(this.ref);
    const circles = svg.selectAll('circle')
      .data(this.props.data, d => d.id);

    circles.enter()
      .append('circle');

    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .style('fill', d => d.datum.color)
      .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

    function dragstarted(d) {
      d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
      d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }

    circles.exit()
      .remove();
  }
}

export default SvgRenderer;
