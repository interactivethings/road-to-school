
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
  var bottom = height * 0.91;

  force 
    .force('yNoSchool',  isolate(data, d3.forceY(bottom), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.3)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.3)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.3)) 
    .force('collide', d3.forceCollide().radius(Math.floor(Math.random() * 10)).strength(0.1)) 
    .alphaTarget(0.3)
    .velocityDecay(0.3);

}

export function question(force, data, {width, height}) {

  force
    .force('yNoSchool',  isolate(data, d3.forceY( (d) => d.y), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.4)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.1)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.1))  
    .alphaTarget(0.3)
    .velocityDecay(0.4);
}

export function quote(force, data, {width, height}) {

  force
    .force('yNoSchool',  isolate(data, d3.forceY( (d) => d.y), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.4)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.3)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; }).strength(0.3))  
    .alphaTarget(0.2)
    .velocityDecay(0.4);
}


export function bomb(data, {width, height}) {
    d3.forceSimulation()
    .force('xBomb', isolate(data, d3.forceX(600), function(d) { return d.type === 'school' && d.type !== 'falling'; }).strength(-0.1))   
    .force('yBomb', isolate(data, d3.forceY(600), function(d) { return d.type === 'school' && d.type !== 'falling'; }).strength(-0.1))   
    .alphaTarget(0.8)
    .velocityDecay(0.6)
    .stop()
    .tick();
}

export function fall(force, data, {width, height}) {
    d3.select('svg').selectAll("path").node(function(d) { return d.type === 'falling';}).setAttribute('style', 'stroke: red');
    
    d3.forceSimulation()
    .force('falling', isolate(data, d3.forceY(height*0.91), function(d) {return d.type === 'falling'; }).strength(0.1))   
    .alphaTarget(0.6)
    .velocityDecay(0.6)
    .stop()
    .tick();

}

