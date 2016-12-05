/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';

export function baseline(data, {width, height}) {

  data.forEach(function(d) {
    d.x += 3 * Math.random();
    d.y += 3 * Math.random();  

    d.x = d.x > width ? d.x - 10: d.x;
    d.y = d.y > height ? d.y - 10 : d.y;    
    d.x = d.x < 0 ? d.x + 10: d.x;
    d.y = d.y < 0 ? d.y + 10 : d.y;
  });

  d3.forceSimulation(data)
      .force('center', d3.forceCenter(width/2,height/2))
      .velocityDecay(0.2)
      .force('collide', d3.forceCollide().radius( (d) => { return d.r + 0.1; }).iterations(2))
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
        return -10*d.r*Math.random();
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