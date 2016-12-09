import './App.css';
import {hoverContentMap} from './hoverContentMap';

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
      <svg width={width/2} height={height} ref={this.onRef} />
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
      .style('fill', d => d.datum.color);

    circles.exit()
      .remove();


    // //Voronoi overlay
    // var width = 500,
    // height = 400,
    // radius = 32;

    // var voronoiNodes = d3.range(20).map(function() {
    //   return {
    //     x: Math.round(Math.random() * (width - radius * 2) + radius),
    //     y: Math.round(Math.random() * (height - radius * 2) + radius)
    //   };
    // });

    // var voronoi = d3.voronoi()
    //   .x(function(d) { return d.cx; })
    //   .y(function(d) { return d.cy; })
    //   .extent([[-1, -1], [width + 1, height + 1]]);

    // var voronoiNode = svg.selectAll("g")
    //   .data(voronoiNodes)
    //   .enter().append("g")
    //     .call(d3.drag()
    //         .on("start", dragstarted)
    //         .on("drag", dragged)
    //         .on("end", dragended));

    // var cell = voronoiNode.append("path")
    //   .data(voronoi.polygons(voronoiNodes))
    //     .attr("d", renderCell)
    //     .attr("id", function(d, i) { return "cell-" + i; });

    // voronoiNode.append("clipPath")
    //     .attr("id", function(d, i) { return "clip-" + i; })
    //   .append("use")
    //     .attr("xlink:href", function(d, i) { return "#cell-" + i; });

    // voronoiNode.append("rect")
    //     .attr("clip-path", function(d, i) { return "url(#clip-" + i + ")"; })
    //     .attr("x", function(d) { return d.x; })
    //     .attr("y", function(d) { return d.y; })
    //     .style("fill", "black");

    // function dragstarted(d) {
    //   d3.select(this).raise().classed("active", true);
    // }

    // function dragged(d) {
    //   d3.select(this).select("circle").attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    //   cell = cell.data(voronoi.polygons(voronoiNodes)).attr("d", renderCell);
    // }

    // function dragended(d, i) {
    //   d3.select(this).classed("active", false);
    // }

    // function renderCell(d) {
    //   return d == null ? null : "M" + d.join("L") + "Z";
    // }



  }
}

export default SvgRenderer;
