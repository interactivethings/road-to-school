/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';


export function baseline(data, {width, height, time}, ratio, counter) {

  function isolate(force, filter) {
    var initialize = force.initialize;
    force.initialize = function() { initialize.call(force, data.filter(filter)); };
    return force;
  }

  d3.forceSimulation(data)
    .alphaTarget(0.3)
    .force('xSchool', isolate(d3.forceX(width/2-200), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(d3.forceY(height/2), function(d) { return d.type === 'school' ; }))
    .force('yNoSchool', isolate(d3.forceY(height/2), function(d) { return d.type === 'noSchool' ; }))
    .force('xNoSchool', isolate(d3.forceX(width/2+200), function(d) { return d.type === 'noSchool' ; }))      
    .velocityDecay(0.2)
    .force('collideSchool', isolate(d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(5).iterations(2).strength(0.8)) 
    .force('collideNoSchool', isolate(d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(5).iterations(2).strength(0.2)) 
    .alphaTarget(0)
    .stop() 
    .tick();

  d3.selectAll('circle').call(d3.drag().on("drag", function(d) {
      d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  }));

  return data;
}

export function disrupt(data, {width, height}, ratio,  counter) {

  function isolate(force, filter) {
    var initialize = force.initialize;
    force.initialize = function() { initialize.call(force, data.filter(filter)); };
    return force;
  }
  
  d3.forceSimulation(data)
    .alphaTarget(0.4)
    .force('xSchool', isolate(d3.forceX(width/2-200), function(d) { return d.id < ratio * data.length; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('ySchool', isolate(d3.forceY(height/2), function(d) { return d.id < ratio * data.length; }))
    .force('yNoSchool', isolate(d3.forceY(height/2), function(d) { return d.id > ratio * data.length; }))
    .force('xNoSchool', isolate(d3.forceX(width/2+200), function(d) { return d.id > ratio * data.length; }).strength(function(d,i) { return d.id/(data.length*8); }))      
    .velocityDecay(0.3)
    .force('collideSchool', isolate(d3.forceCollide(), function(d) { return d.id < ratio * data.length; }).radius(5).iterations(2).strength(0.8))
    .force('collideNoSchool', isolate(d3.forceCollide(), function(d) { return d.id > ratio * data.length; }).radius(5).iterations(2).strength(0.2))
    .stop() 
    .tick();


  return data;
}

