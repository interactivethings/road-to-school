import './App.css';

import React, {Component} from 'react';
import DOM from 'react-dom';
import * as d3 from 'd3';

class Chart extends Component {
  render() {
    const {data, width, height} = this.props;
    return (
      <div>
        <SvgRenderer data={data} width={width} height={height} />
      </div>
    );
  }
}

class SvgRenderer extends Component {
  componentDidMount() {
    d3.select(DOM.findDOMNode(this))
      .call(this.renderSvg.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    d3.select(DOM.findDOMNode(this))
      .call(this.renderSvg.bind(this));
  }

  render() {
    const {width, height} = this.props;
    return (
      <svg width={width} height={height} />
    );
  }

  renderSvg(svg) {
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
      d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y).attr('r', d.r = 10);
    }

    function dragended(d) {
      d3.select(this).classed("active", false).attr('r', d.r = 2);
    }

    circles.exit()
      .remove();
  }
}

export default Chart;
