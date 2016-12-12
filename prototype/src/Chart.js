import React, {Component} from 'react';
import * as d3 from 'd3';
import './App.css';
import {voronoiContentMap, findTextforVoronoi} from './VoronoiContentMap';

const LETTER_PATH = "M351 0l11 17.16c-12.07 9.59-6.83 22.49-5.61 34.61 1.12 11.09 3 22.09 4.18 33.18a46.3 46.3 0 0 1-4.3 25.76c-4 8.06-10.53 12.24-19.55 12.26-6.82 0-13.71.41-20.44-.4-9.49-1.15-16.06-7.77-22.25-14.28-3.61-3.8-6.29-3.61-9.85-.33s-7.27 5.83-10.77 8.92c-5 4.42-10.93 6.16-17.44 6.24-5.5.07-11 .15-16.49 0-2.84-.1-3.91.87-4.68 3.71-2.46 9.14-5.18 18.22-8.2 27.19-3.49 10.37-9.63 18.5-20.57 22H192l-21.14-10.73.1-1.62c1.28-.37 2.65-1.23 3.84-1 14.4 2.49 26.25-2.21 36-12.69 5.55-6 10.73-12.28 16.3-18.23 2.23-2.39 1.63-4 .07-6.42-3.64-5.56-7.07-11.27-10.29-17.08a5.9 5.9 0 0 1-.15-4.85c2.93-5.39 6.26-10.57 10.15-17 4.9 15.35 16.77 14.51 28.42 13.68 7.33-.53 14.61-1.69 21.92-2.57l.36-2.3-16-7.41c2.66-6.12 4.77-12.81 8.29-18.66 5.64-9.39 23.21-11.19 34.47-4.19 4.89 3 8.35 7.19 9.3 13 1.1 6.69.06 12.65-6.52 16.37-1.43.81-2.71 1.87-5.24 3.64 4.81.86 8.54 2 12.31 2.1 8.65.32 17.31.3 26 .16 7.75-.13 10.1-2.14 9.67-9.94-.55-9.78-1.92-19.52-3.3-29.23-1.89-13.34-4.3-26.61-6.14-40-.9-6.53.56-12.59 5.9-17.18 1.35-1.16 2.5-2.56 3.74-3.86zM0 97c2.9-13.54 12.92-20.84 24-27 3.28-1.83 4.52-3.73 3.48-7.46-2.41-8.66.38-15.3 9.14-19.89 1.13 7.41 2.26 14.69 3.36 22 1.37 9 2.53 18.13 4.12 27.14 1.29 7.36 2.6 8.27 9.89 8.35 8 .08 16-.07 23.95.19 7 .23 12.13-2.74 16-8.33a36.16 36.16 0 0 1 2.93-3.22 33.18 33.18 0 0 1 1 3.26c1.3 6.68 3.54 8.61 10.33 8.55 10.32-.09 20.63-.26 30.95-.4a8.73 8.73 0 0 0 2.49-.12c3.37-1.09 6.7-2.29 10-3.45-1.45-2.66-2.51-5.64-4.43-7.89-3.14-3.67-3.55-7.18-1.39-11.41 2.62-5.12 4.93-10.4 7.69-16.28 7.51 15.6 10.58 30.91 5.28 47C155.33 118.86 146 122 136 122.66c-10.94.76-22 .32-33 .26-4.83 0-8.68-1.79-10.51-6.76a39 39 0 0 0-2.95-5.23 25.89 25.89 0 0 0-2.7 3.5c-3.38 6.51-8.72 9.08-16 8.74-7-.33-14 0-21-.18s-9.75-2.09-12.1-8.92c-1.67-4.85-3-9.84-4.76-15.88-2.87 3.39-5.41 6.27-7.82 9.25A15.43 15.43 0 0 1 0 106zm29.18-22.23c-5.06 3.71-9.43 6.65-13.46 10-2.06 1.71-3.3 4.63.49 5.65a67.26 67.26 0 0 0 13.18 1.7c.69 0 2.23-2 2.13-2.87-.47-4.4-1.36-8.74-2.34-14.48zM400 100c-1.32 6.5-2.49 13-4.05 19.47-.36 1.49-2 2.67-3.83 4.93-1.34-13.52-2.35-25.25-3.71-36.95q-3-26.29-6.52-52.52c-1.33-10.15 2.74-17.67 11.11-24.09.69 8.67 1.27 16.87 2 25.06q2 22.88 4.23 45.75A11.11 11.11 0 0 0 400 84zM35.62 34.23l-12.5-8.53-8 11.91-12.42-8.9L11 14.28l12.4 8 7.08-10.76 12.4 9.21zM76.19 134.74l13.11 8.89 7.15-11.82 12.42 9.25-7.87 14.11-12.66-8.5-6.82 10.93-13-9.28zM153 152.63l-12.45-8.28 7.86-12.35 13 8.61z";
//create a lookup map with the different roles
//maybe add both the english and the arabic ones and control opacity with g element in d3
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
      <div>
        <svg width={this.props.width * 0.7} height={this.props.height * 0.8} ref={this.onRef}>
        </svg>
      </div>
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
      .on("hover", function(d,i) {
        console.log(findTextforVoronoi(voronoiContentMap, i) );
      });

    /*----------------------------- Main Vis --------------------*/

    const circles = svg.selectAll('path')
      .data(this.props.data, d => d.id);

    circles.enter()
      .append('path');

    circles
      .attr('transform', d => 'translate('+ d.x + ',' + d.y +') scale(' + 0.2 + ')')
      .attr('d', LETTER_PATH)
      .style('fill', 'rgba(0,0,0,0.6)')
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
