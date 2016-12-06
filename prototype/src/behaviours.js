/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';


export function baseline(data, {width, height, time}, ratio) {

  function isolate(force, filter) {
    var initialize = force.initialize;
    force.initialize = function() { initialize.call(force, data.filter(filter)); };
    return force;
  }

  d3.forceSimulation(data)
      .force('X', isolate(d3.forceX(width/2-200), function(d) { return d.type === 'school' ; }))
      .force('Y', isolate(d3.forceY(height/2), function(d) { return d.type === 'school' ; }))
      .force('Y2', isolate(d3.forceY(height/2), function(d) { return d.type === 'noSchool' ; }))
      .force('X2', isolate(d3.forceX(width/2+200), function(d) { return d.type === 'noSchool' ; }))      
      .alphaTarget(0.9)
      .velocityDecay(0.3)
      .force('collide', d3.forceCollide().radius( (d) => { return d.r + Math.random()*2; }).iterations(2))
      .stop() 
      .tick();

  return data;
}

export function disrupt(data, {width, height}, ratio) {

  function isolate(force, filter) {
    var initialize = force.initialize;
    force.initialize = function() { initialize.call(force, data.filter(filter)); };
    return force;
  }
  d3.forceSimulation(data)
      .force('X', isolate(d3.forceX(width/2-200), function(d) { return d.id < ratio * data.length; }))
      .force('Y', isolate(d3.forceY(height/2), function(d) { return d.id < ratio * data.length; }))
      .force('Y2', isolate(d3.forceY(height/2), function(d) { return d.id > ratio * data.length; }))
      .force('X2', isolate(d3.forceX(width/2+200), function(d) { return d.id > ratio * data.length; }))
      .alphaTarget(0.9)
      .velocityDecay(0.4)
      .force('collide', d3.forceCollide().radius( (d) => { return d.r; }).iterations(2))
      .stop() 
      .tick();


  return data;
}

