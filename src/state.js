import * as d3 from 'd3';

const BOMB_READY   = 'ready';
const BOMB_IGNITED = 'ignited';
const BOMB_LOCKED  = 'locked';

export function mkInitialState(numberOfActors, toActor) {
  let state = {
    data: d3.range(numberOfActors).map(toActor),
    mode: 'intro',
    pctScrolled: 0,
    bombStates: [
      {triggerAt: 20, status: BOMB_READY},
      {triggerAt: 32, status: BOMB_READY}
    ],
    audioMuted: false
  }

  return state;
}

export function mkActor(cols, rows, width, height) {
  const colWidth = width / (cols + 2 /* 1 col padding per side */);
  const rowHeight = height / rows;

  return function(id, i) {
    const row = Math.floor(i / cols);
    const col  = i % cols;

    const x = colWidth + col * colWidth;
    const y = rowHeight + row * rowHeight;

    return {
      id: id,
      x: x,
      y: y,
      x0: x,
      y0: y,
      vx: 0,
      vy: 0,
      letterID: Math.floor(Math.random() * 4),
      type: 'school'
    };
  }
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
        throw new Error("Impossible bombState");
    }

    if (nextStatus !== status) needsUpdate = true;

    return { triggerAt, status: nextStatus };
  });

  return [nextBombStates, needsUpdate];
}
