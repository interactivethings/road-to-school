/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';

export function changetype(data, {time}) {
  
  setInterval(data.forEach(function(d) {
    d.type = Math.random() < 0.40 ? 'school' : 'noSchool';
  }), 10000);
  return data;
}

export function baseline(data, {width, height, time}) {
  function isolate(force, filter) {
    var initialize = force.initialize;
    force.initialize = function() { initialize.call(force, data.filter(filter)); };
    return force;
  }

  data.forEach(function(d) {
    // d.x += 2 * Math.random();
    // d.y += 2 * Math.random();  

    d.x = d.x > width ? d.x - 10: d.x;
    d.y = d.y > height ? d.y - 10 : d.y;    
    d.x = d.x < 0 ? d.x + 10: d.x;
    d.y = d.y < 0 ? d.y + 10 : d.y;
  });

  d3.forceSimulation(data)
      .force('center', isolate(d3.forceCenter(width/2 - 200, height/2), function(d) { return d.type === 'school'; }))
      .force('X', isolate(d3.forceCenter(width/2 + 200, height/2), function(d) { return d.type === 'noSchool'; }))
      .alphaTarget(0.9)
      .velocityDecay(0.6)
      .force('collide', d3.forceCollide().radius( (d) => { return d.r; }).iterations(1))
      .stop() 
      .tick();

  return data;
}

export function collapse(data, {width, height}) {

  d3.forceSimulation(data)
      .force('center', d3.forceCenter(width/2,height/2))
      .force('charge', d3.forceManyBody().strength(5))
      .stop() 
      .tick();
  return data;
}

export function disrupt(data, {width, height}) { 


  d3.forceSimulation(data)
      .force('disrupt', d3.forceManyBody().strength((d) => {
        return 10*Math.cos(d.r);
      }))
      .stop() 
      .tick();
  return data;
}

export function fallDown(data, {width, height}) {

  data.forEach(function(d){
    if (d.x > width) { d.fx = d.x };
    if (d.y > height) { d.fy = d.y - d.r/2};
  });

  d3.forceSimulation(data)
    .alphaTarget(0.8)
    .force('Y', d3.forceY().strength((d) => {
      return d.static ? 0.0001 : -0.01;
    }))
    .stop()
    .tick();
  return data;
}

