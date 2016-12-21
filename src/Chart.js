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
    this.renderSvg = this.renderSvg.bind(this);
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
      <div className="Chart" width={this.props.width} height={this.props.height}>
        <svg className="Chart-Element" width={this.props.width} height={this.props.height} ref={this.onRef} />
      </div>
    );
  }

  renderSvg() {
    if (!this.ref) {
      return;
    }

    const {mode} = this.props;

    const svg = d3.select(this.ref);

    /*----------------------------- Main Vis --------------------*/

    const actors = svg.selectAll('path') /* should be g */
      .data(this.props.data, d => d.id);

    /* children of <g> should be:
    enter()
      path // <arabic>
      text // teacher
      rect // 0,0 70,30
    */

    actors.enter().append('path')
      .attr('class', 'word')
      .attr('d', (d) => letters[d.letterID].LETTER_PATH)
      .call(this.onDrag);

    actors
      .attr('transform', (d) => {
        const s = isActive(mode, d) ? 2 : 1.2;
        return `translate(${d.x},${d.y}) scale(${s})`;
      })
      .classed('isFalling', (d) => isActive(mode, d) && d.type === 'falling')
      .classed('isQuoteA', (d) => isActive(mode, d) && d.quote_A)
      .classed('isQuoteB', (d) => isActive(mode, d) && d.quote_B);

    actors.exit()
      .remove();
  }
}

function isActive(mode, d) {
  return (mode === 'fall' && d.type === 'falling')
      || (mode === 'quoteA' && d.quote_A)
      || (mode === 'quoteB' && d.quote_B);
}

export default SvgRenderer;
