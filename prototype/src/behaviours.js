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
    .force('xSchool', isolate(d3.forceX(width/2), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(d3.forceY(height/2), function(d) { return d.type === 'school' ; }))
    .force('xNoSchool', isolate(d3.forceX(width/2), function(d) { return d.type === 'noSchool' ; }))      
    .force('yNoSchool', isolate(d3.forceY(height/2), function(d) { return d.type === 'noSchool' ; }))
    .velocityDecay(0.2)
    .force('collideSchool', isolate(d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(function(d) { return d.r + 2; }).iterations(2).strength(0.8)) 
    .force('collideNoSchool', isolate(d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(function(d) { return d.r +2; }).iterations(2).strength(0.8)) 
    .alphaTarget(0)
    .stop() 
    .tick();

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
    .velocityDecay(0.3)
    .force('xSchool', isolate(d3.forceX(width/2), function(d) { return d.id < ratio * data.length; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('ySchool', isolate(d3.forceY(height/2), function(d) { return d.id < ratio * data.length; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('xNoSchool', isolate(d3.forceX(function(d,i) { return Math.sin(i) * 250 + (width/2);} ), function(d) { return d.id > ratio * data.length; }).strength(0.1))      
    .force('yNoSchool', isolate(d3.forceY(function(d,i) { return Math.cos(i) * 250 + (height/2);} ), function(d) { return d.id > ratio * data.length; }).strength(0.1))  
    .velocityDecay(0.3)
    .force('collideSchool', isolate(d3.forceCollide(), function(d) { return d.id < ratio * data.length; }).radius(function(d) { return d.r; }).iterations(2).strength(0.8))
    .force('collideNoSchool', isolate(d3.forceCollide(), function(d) { return d.id > ratio * data.length; }).radius(function(d) { return d.r; }).iterations(2).strength(0.5))
    .velocityDecay(0.3)
    .stop() 
    .tick();
  
  d3.selectAll('circle')
    .on("mousedown", function() { 
      d3.event.stopPropagation(); 
      d3.forceSimulation(data)
        .force('bomb', d3.forceManyBody().strength(-40))
        .velocityDecay(0.2)
        .stop()
        .tick();
    });



  return data;
}

