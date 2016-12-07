/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';



export function baseline(force, data, {width, height, time}, ratio) { 
  console.log('baseline')
  
  function isolate(aForce, filter) {
    var initialize = aForce.initialize;
    aForce.initialize = function() { initialize.call(aForce, data.filter(filter)); };
    return aForce;
  }

  force
    .velocityDecay(0.1)
    .alphaTarget(0.3)
    .force('xSchool', isolate(d3.forceX(width/2), function(d) { return d.type === 'school' ; }))
    .force('ySchool', isolate(d3.forceY(height/2), function(d) { return d.type === 'school' ; }))
    .force('xNoSchool', isolate(d3.forceX(width/2), function(d) { return d.type === 'noSchool' ; }))      
    .force('yNoSchool', isolate(d3.forceY(height/2), function(d) { return d.type === 'noSchool' ; }))
    .force('collideSchool', isolate(d3.forceCollide(), function(d) { return d.type === 'school' ; }).radius(function(d) { return d.r + 2; }).iterations(2).strength(0.8)) 
    .force('collideNoSchool', isolate(d3.forceCollide(), function(d) { return d.type === 'noSchool' ; }).radius(function(d) { return d.r +2; }).iterations(2).strength(0.8)) 
}

export function disrupt(force, data, {width, height}, ratio) {
  console.log('disrupt')

  function isolate(aForce, filter) {
    var initialize = aForce.initialize;
    aForce.initialize = function() { initialize.call(aForce, data.filter(filter)); };
    return aForce;
  }
  
  force
    .alphaTarget(0.5)
    .velocityDecay(0.3)
    .force('xSchool', isolate(d3.forceX(width/2), function(d) { return d.id < ratio * data.length; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('ySchool', isolate(d3.forceY(height/2), function(d) { return d.id < ratio * data.length; }).strength(function(d,i) { return d.id/(data.length*8); }))
    .force('xNoSchool', isolate(d3.forceX(function(d,i) { return Math.sin(i) * 250 + (width/2);} ), function(d) { return d.id > ratio * data.length; }).strength(0.1))      
    .force('yNoSchool', isolate(d3.forceY(function(d,i) { return Math.cos(i) * 250 + (height/2);} ), function(d) { return d.id > ratio * data.length; }).strength(0.1))  
    .force('collideSchool', isolate(d3.forceCollide(), function(d) { return d.id < ratio * data.length; }).radius(function(d) { return d.r; }).iterations(2).strength(0.8))
    .force('collideNoSchool', isolate(d3.forceCollide(), function(d) { return d.id > ratio * data.length; }).radius(function(d) { return d.r; }).iterations(2).strength(0.5))
  
  d3.selectAll('circle')
    .on("mousedown", function() { 
      d3.event.stopPropagation(); 
      force
        .force('bomb', d3.forceManyBody().strength(-2))
        .velocityDecay(0.2);
    });
}

export function test(force, data, {width, height}, ratio) { 
  console.log('test');
  function isolate(aForce, filter) {
    var initialize = aForce.initialize;
    aForce.initialize = function() { initialize.call(aForce, data.filter(filter)); };
    return aForce;
  }
  
  force
    .alphaTarget(0.8)
    .velocityDecay(0.3)
    .force('collideSchool', isolate(d3.forceCollide(), function(d) { return d.id < ratio * data.length; }).radius(function(d) { return d.r; }).iterations(2).strength(0.5))
    .force('collideNoSchool', isolate(d3.forceCollide(), function(d) { return d.id > ratio * data.length; }).radius(function(d) { return d.r; }).iterations(2).strength(0.8))
  
}