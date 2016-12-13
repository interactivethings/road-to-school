
import * as d3 from 'd3';
import {isolate} from './utils/forceHelpers';

//width of SVG: width * 0.5
//height of SVG: height

export function baseline(force, data, {width, height}) { 
  // console.log('baseline')
  force
    .force('collide', d3.forceCollide().radius(2).strength(0.4)) 
    .force("charge", d3.forceManyBody().strength(0.2).distanceMin(0.3)) 
    .alphaTarget(0.3)
    .velocityDecay(0.4);
}

export function outOfSchool(force, data, {width, height}) {
  // console.log('outofSchool')
  var bottom = height * 0.95;
  force 
    .force('yNoSchool',  isolate(data, d3.forceY(bottom), function(d) { return d.type === 'noSchool'; }).strength(0.1)) 
    .force('collide', d3.forceCollide().radius(Math.floor(Math.random() * 20)).strength(0.3)) 
    .force("charge", d3.forceManyBody().strength(0.2).distanceMin(0.3)) 
    .alphaTarget(0.3)
    .velocityDecay(0.3);

}

export function whileAndQuestion(force, data, {width, height}) {
  force
    .force('collide', d3.forceCollide().radius(2).strength(0.4)) 
    .force("charge", d3.forceManyBody().strength(0.2).distanceMin(0.3)) 
    .alphaTarget(0.3)
    .velocityDecay(0.4);
}


export function bomb(data, {width, height}) {
    // console.log(' bomb')
    d3.forceSimulation()
    .force('bombX', isolate(data, d3.forceX(function(d) { 
        var dx = Math.abs(width/2 * 0.4 - d.x); 
        return dx;
    }), function(d) { 
        return d; 
    })
    .strength(-0.1)) 
    .force('bombY', isolate(data, d3.forceY(function(d) { 
        var dy = Math.abs(height/2 * 0.4 - d.y); 
        return dy;
    }), function(d) { 
        return d; 
    })
    .strength(-0.1)) 
    .alphaTarget(0.5)
    .velocityDecay(0.5)
    .stop()
    .tick();
}

export function perturbation(data, {width, height}) {
    // console.log('I want to back to schooool')
    d3.forceSimulation()
    .force('perturbationX', isolate(data, d3.forceX(width*0.7/2), function(d) { return d.type === 'noSchool' }).strength(0.2))  
    .force('perturbationY', isolate(data, d3.forceY(height*0.8/2), function(d) { return d.type === 'noSchool' }).strength(0.2))        
    .alphaTarget(0.5)
    .velocityDecay(0.5)
    .stop()
    .tick();
}

