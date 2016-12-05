/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';

export function baseline(data, {width, height}) {

  data.forEach(function(d) {
    d.x += 3 * Math.random();
    d.y += 3 * Math.random();  
  });

  d3.forceSimulation(data)
      .force('center', d3.forceCenter(width/2,height/2))
      .force(
        "collide", 
        d3.forceCollide()
          .strength(0.8)
          .radius(4)
      )
      .stop() 
      .tick();
  return data;
}

export function fallDown(data, {width, height}) {

  d3.forceSimulation(data)
    .alphaTarget(0.8)
    .force("Y", d3.forceY().strength((d) => {
      return d.static ? 0.0001 : -0.01;
    }))
    .stop()
    .tick();
  return data;
}

export function collapse(data, {width, height}) {

  d3.forceSimulation(data)
      .force('center', d3.forceCenter(width/2,height/2))
      .force("charge", d3.forceManyBody().strength((d) => {
      return 0.1;
    }))
      .stop() 
      .tick();
  return data;
}