import React, {Component} from 'react';
import * as d3 from 'd3';
import './App.css';
import {voronoiContentMap, findTextforVoronoi} from './VoronoiContentMap';

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
    return (
      <svg width={this.props.width * 0.7} height={this.props.height * 0.8} ref={this.onRef} />
    );
  }

  renderSvg() {
    if (!this.ref) {
      return;
    }

    const svg = d3.select(this.ref);
    const {width, height} = this.props;

    /*----------------------------- Voronoi overlay --------------------*/
    var nodes = d3.range(voronoiContentMap.length).map(function() {
      return {
        x:  100 *Math.random() + width/2* 0.7 - 70,
        y:  100 *Math.random() + height/2 * 0.8
      };
    });

    var voronoi = d3.voronoi()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .extent([[-1, -1], [width + 1, height + 1]]);

    var node = svg.selectAll("g")
      .data(nodes)
      .enter().append("g");

    node.append("path")
      .data(voronoi.polygons(nodes))
      .attr("d", renderCell)
      .on("mousedown", function(d,i) {
        console.log(findTextforVoronoi(voronoiContentMap, i) );
      });

    /*----------------------------- Main Vis --------------------*/

    const circles = svg.selectAll('circle')
      .data(this.props.data, d => d.id);

    circles.enter()
      .append('circle');

    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .style('fill', d => d.datum.color)
      .call(d3.drag().on("drag", dragged));
    
    circles.exit()
      .remove();

    /*----------------------------- Helper functions --------------------*/

    function renderCell(d) {
      return d == null ? null : "M" + d.join("L") + "Z";
    }

    function dragged(d) {   
      d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);    
    }


  }
}

export default SvgRenderer;
