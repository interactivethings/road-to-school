
import * as d3 from 'd3';
import {isolate} from './utils/forceHelpers';

//width of SVG: width * 0.5
//height of SVG: height

export function intro(force, data, {width, height}) {
  force 
    .force('X0',  d3.forceX((d) => d.x0).strength(0.8))
    .force('Y0',  d3.forceY((d) => d.y0).strength(0.8)) 
    .alphaTarget(0.3)
    .velocityDecay(0.3);

}

export function outOfSchool(force, data, {width, height}) {
  var bottom = height*0.94 + Math.floor(Math.random() * -3)/100;

  force 
    .force('yNoSchool',  isolate(data, d3.forceY(bottom), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.3)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.3)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.3)) 
    .force('collideNoSchool',  isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).radius(10).strength(0.3)) 
    .alphaDecay(0.2)
    .velocityDecay(0.3);

}

export function question(force, data, {width, height}) {

  force
    .force('yNoSchool',  isolate(data, d3.forceY( (d) => d.y), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.4)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.1)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.1))  
    .alphaTarget(0.1)
    .velocityDecay(0.9);
}



export function bomb(data, {width, height}) {

    d3.forceSimulation()
    .force('xBomb', isolate(data, d3.forceX(function(d) {return Math.cos(d.id) * 10 + width * 0.2;}), function(d) { return d.type === 'school' && d.type !== 'falling'; }).strength(-0.1))   
    .force('yBomb', isolate(data, d3.forceY(function(d) {return Math.sin(d.id) * 10 + height * 0.4;}), function(d) { return d.type === 'school' && d.type !== 'falling'; }).strength(-0.1))   
    .alphaTarget(0.8)
    .velocityDecay(0.6)
    .stop()
    .tick();
}

export function fall(force, data, {width, height}) {

    d3.select('svg').selectAll('path')
        .filter( (d) => d.type === 'falling'  )
        .transition()
        .style('fill', '#9C261F')
        .style('stroke', '#9C261F')
        .style('stroke-width', '2');

    d3.forceSimulation()
    .force('falling', isolate(data, d3.forceY(height*0.93), function(d) {return d.type === 'falling' ; }).strength(0.01))   
    .alphaDecay(0.2)
    .velocityDecay(0.2);
}

export function quoteA(force, data, {width, height}) {

    d3.select('svg').selectAll("path")
        .filter( (d) => d.quote_A  )
        .transition()
        .style('fill', '#9C261F')
        .style('stroke', '#9C261F')
        .style('stroke-width', '2');

    d3.forceSimulation()
    .force('lifting', isolate(data, d3.forceY(height* 0.35), function(d) {return d.quote_A; }).strength(0.3))   
    .alphaDecay(0.2)
    .velocityDecay(0.2);

}

export function quoteB(force, data, {width, height}) {

    d3.select('svg').selectAll("path")
        .filter( (d) => d.quote_B  )
        .transition()
        .style('fill', '#9C261F')
        .style('stroke', '#9C261F')
        .style('stroke-width', '2');

    d3.forceSimulation()
    .force('lifting', isolate(data, d3.forceY(height* 0.35), function(d) {return d.quote_B; }).strength(0.3))   
    .alphaDecay(0.2)
    .velocityDecay(0.2);

  force
    .force('yNoSchool',  isolate(data, d3.forceY( (d) => d.y), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.4)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.1)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.1))  
    .alphaTarget(0.1)
    .velocityDecay(0.9);

}
