import * as d3 from 'd3';

const BOMB_READY   = 'ready';
const BOMB_IGNITED = 'ignited';
const BOMB_LOCKED  = 'locked';

export function mkInitialState(numberOfActors) {
  return {
    data: d3.range(numberOfActors).map(mkActor),
    mode: 'baseline',
    pctScrolled: 0,
    bombStates: [
      {triggerAt: 17, status: BOMB_READY},
      {triggerAt: 32, status: BOMB_READY}
    ],
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


export function advanceBombState(bombStates, pctScrolled) {
  let needsUpdate = false;
  const nextBombStates = bombStates.map(({triggerAt, status}) => {
    const inHotZone = triggerAt === pctScrolled;

    let nextStatus;
    switch (status) {
      case BOMB_READY:
        nextStatus = inHotZone ? BOMB_IGNITED : status;
        break;
      case BOMB_IGNITED:
        nextStatus = BOMB_LOCKED;
        break;
      case BOMB_LOCKED:
        nextStatus = inHotZone ? status : BOMB_READY;
        break;
      default:
        throw "Impossible bombState";
    }

    if (nextStatus !== status) needsUpdate = true;

    return { triggerAt, status: nextStatus };
  });

  return [nextBombStates, needsUpdate];
}
