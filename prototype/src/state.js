import * as d3 from 'd3';

export function mkInitialState(numberOfActors) {
  return {
    data: d3.range(numberOfActors).map(mkActor),
    mode: 'baseline',
    pctScrolled: 0,
    bombActivity: undefined,
    audioActive: true
  }
}

function mkActor(id) {
  return {
    id: id,
    x: window.innerWidth/10, // FIXME: is dependent on props.width
    y: 10, // FIXME: is dependent on props.height
    vx: 0,
    vy: 0,
    letterID: Math.floor(Math.random() * 4),
    type: 'school'
  };
}
