
import * as d3 from 'd3';
import {isolate} from './utils/forceHelpers';

//width of SVG: width * 0.5
//height of SVG: height

export function intro(force, data, {width, height}) {
  // console.log('outofSchool')
  force 
    .force('X0',  d3.forceX((d) => d.x0).strength(0.8))
    .force('Y0',  d3.forceY((d) => d.y0).strength(0.8)) 
    .alphaTarget(0.3)
    .velocityDecay(0.3);

}

export function outOfSchool(force, data, {width, height}) {
  // console.log('outofSchool')
  var bottom = height * 0.92;
  force 
    .force('yNoSchool',  isolate(data, d3.forceY(bottom), function(d) { return d.type === 'noSchool'; }).strength(0.3)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool'; }).strength(0.8)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool'; }).strength(0.8)) 
    .force('collide', d3.forceCollide().radius(Math.floor(Math.random() * 10)).strength(0.2)) 
    .alphaTarget(0.3)
    .velocityDecay(0.3);

}

export function question(force, data, {width, height}) {

  force
    .force('yNoSchool',  isolate(data, d3.forceY( (d) => d.y), function(d) { return d.type === 'noSchool'; }).strength(0.4)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool'; }).strength(0.1)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool'; }).strength(0.1))  
    .alphaTarget(0.3)
    .velocityDecay(0.4);
}

export function quote(force, data, {width, height}) {

  force
    .force('yNoSchool',  isolate(data, d3.forceY( (d) => d.y), function(d) { return d.type === 'noSchool'; }).strength(0.4)) 
    .force('Y0',  isolate(data, d3.forceY((d) => d.y0), function(d) { return d.type !== 'noSchool'; }).strength(0.8)) 
    .force('X0',  isolate(data, d3.forceX((d) => d.x0), function(d) { return d.type !== 'noSchool'; }).strength(0.8))  
    .alphaTarget(0.2)
    .velocityDecay(0.4);
}


export function bomb(data, {width, height}) {
    console.log(' bomb')
    d3.forceSimulation()
    .force('xBomb', isolate(data, d3.forceX(600), function(d) { return d.type === 'school'; }).strength(-0.2))   
    .force('yBomb', isolate(data, d3.forceY(600), function(d) { return d.type === 'school'; }).strength(-0.2))   
    .alphaTarget(0.5)
    .velocityDecay(0.5)
    .stop()
    .tick();
}

export function perturbation(data, {width, height}) {
    console.log('one student left')

    d3.forceSimulation()
    .force('perturbationY', isolate(data, d3.forceY(height * 0.9), function(d) { return (d.type === 'school' && d.id===45 ); }).strength(0.4))        
    .alphaTarget(0.5)
    .velocityDecay(0.5)
    .stop()
    .tick();
}

