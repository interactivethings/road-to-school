/**
 * Behaviours mutate data for performance reasons
 */

import * as d3 from 'd3';

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

export function moveAround(data, {width, height}) {
  data.forEach(function(d) {
    d.x = d.x < width ? d.x + 1 : 0;
    d.y = d.y < height ? d.y + 1 : 0;
  });
  return data;
}
