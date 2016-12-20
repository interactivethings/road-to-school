
import * as d3 from 'd3';
import {isolate} from './utils/forceHelpers';

//width of SVG: width * 0.5
//height of SVG: height

export function intro(force, data, {width, height}) {
  force 
    .force('X0',  d3.forceX((d) => d.x0))
    .force('Y0',  d3.forceY((d) => d.y0)) 
    .alphaTarget(0.3)
    .velocityDecay(0.3);

}

export function outOfSchool(force, data, {width, height}) {
  var bottom = height*0.94 + Math.floor(Math.random() * -3)/100;

  force 
    .force('yNoSchool',  isolate(data, d3.forceY(bottom), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).strength(0.1)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; })) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool' && d.type !== 'falling' ; })) 
    .force('collideNoSchool',  isolate(data, d3.forceCollide(), function(d) { return d.type === 'noSchool' && d.type !== 'falling'; }).radius(12).strength(0.3));
}


export function bomb(data, {width, height}) {

    d3.forceSimulation()
    .force('xBomb', isolate(data, d3.forceX(function(d) {return Math.cos(d.id) * 10 + width * 0.2;}), function(d) { return d.type === 'school' && d.type !== 'falling'; }).strength(-0.1))   
    .force('yBomb', isolate(data, d3.forceY(function(d) {return Math.sin(d.id) * 10 + height * 0.4;}), function(d) { return d.type === 'school' && d.type !== 'falling'; }).strength(-0.1))   
    .alphaTarget(0.8)
    .velocityDecay(0.8)
    .stop()
    .tick();
}

export function fall(force, data, {width, height}) {
    force
    .force('fallingforce', isolate(data, d3.forceY(height*0.93), function(d) {return d.type === 'falling' ; }).strength(0.03));   
}

export function quoteA(force, data, {width, height}) {
    force
    .force('quoteAforce', isolate(data, d3.forceY(height* 0.1), function(d) {return d.quote_A; }).strength(0.14));
  
}

export function quoteB(force, data, {width, height}) {
    force
    .force('quoteBforce', isolate(data, d3.forceY(height* 0.2), function(d) {return d.quote_B; }).strength(0.14));    
}
