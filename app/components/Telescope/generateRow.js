import React from 'react';
import ROW_CONFIG from './rowConfigurationEnum';
import Polyline from '../SVG/Polyline';

function warnClient() {
  console.warn('Invalid row configuration provided');
}

export function generateRow(dimension = 0, count = 0, rowConfiguration = ROW_CONFIG.TOP) {
  if (!(rowConfiguration instanceof ROW_CONFIG)) {
    warnClient();
    return [];
  }
  if (!dimension) { return []; }

  const row = [];
  const COUNT = count;
  const SPACING = (dimension / count);
  const LARGE_TICK_LENGTH = 12;
  const LARGE_TICK_THICKNESS = 2;
  const SHORT_TICK_LENGTH = (LARGE_TICK_LENGTH / 2);
  const SHORT_TICK_THICKNESS = (LARGE_TICK_THICKNESS / 2);

  let ACCUMULATOR = 0;

  for (let i = 0; i <= COUNT; i += 1) {
    const isLongTick = (i % 5) === 0;

    let x1;
    let y1;
    let x2;
    let y2;

    ACCUMULATOR += SPACING;

    switch (rowConfiguration) {
      case ROW_CONFIG.TOP:
        x1 = ACCUMULATOR;
        y1 = 0;
        x2 = ACCUMULATOR;
        y2 = (isLongTick) ? LARGE_TICK_LENGTH : SHORT_TICK_LENGTH;
        break;
      case ROW_CONFIG.BOTTOM:
        x1 = ACCUMULATOR;
        y1 = dimension;
        x2 = ACCUMULATOR;
        y2 = (isLongTick) ? (dimension - LARGE_TICK_LENGTH) : (dimension - SHORT_TICK_LENGTH);
        break;
      case ROW_CONFIG.LEFT:
        x1 = 0;
        y1 = ACCUMULATOR;
        x2 = (isLongTick) ? LARGE_TICK_LENGTH : SHORT_TICK_LENGTH;
        y2 = ACCUMULATOR;
        break;
      case ROW_CONFIG.RIGHT:
        x1 = dimension;
        y1 = ACCUMULATOR;
        x2 = (isLongTick) ? (dimension - LARGE_TICK_LENGTH) : (dimension - SHORT_TICK_LENGTH);
        y2 = ACCUMULATOR;
        break;
      default:
        warnClient();
        break;
    }

    const polylineAttributes = {
      points: `${x1},${y1} ${x2},${y2}`,
      strokeWidth: (isLongTick) ? LARGE_TICK_THICKNESS : SHORT_TICK_THICKNESS,
    };

    row.push(<Polyline {...polylineAttributes} />);
  }

  return row;
}
