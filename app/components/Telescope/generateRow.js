import React from 'react';
import ROW_CONFIG from './rowConfigurationEnum';
import Polyline from '../SVG/Polyline';

export function generateRow(dimension = 0, count = 0, rowConfiguration = ROW_CONFIG.TOP) {
  if (!(rowConfiguration instanceof ROW_CONFIG)) {
    console.warn('Invalid row configuration provided');
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
  let Y_MODIFIER;

  switch (rowConfiguration) {
    case ROW_CONFIG.TOP:
      Y_MODIFIER = 0;
      break;
    case ROW_CONFIG.BOTTOM:
      Y_MODIFIER = dimension;
      break;
    case ROW_CONFIG.LEFT:
      console.log('LEFT');
      break;
    case ROW_CONFIG.RIGHT:
      console.log('RIGHT');
      break;
    default:
      console.log('UNSUPPORTED...');
      break;
  }

  for (let i = 0; i <= COUNT; i += 1) {
    const isLongTick = (i % 5) === 0;
    ACCUMULATOR += SPACING;
    const polylineAttributes = {
      points: `${
        ACCUMULATOR},${Y_MODIFIER} 
        ${ACCUMULATOR},${(isLongTick) ? Math.abs(Y_MODIFIER - LARGE_TICK_LENGTH) : Math.abs(Y_MODIFIER - SHORT_TICK_LENGTH)}`,
      strokeWidth: (isLongTick) ? LARGE_TICK_THICKNESS : SHORT_TICK_THICKNESS,
    };

    row.push(<Polyline {...polylineAttributes} />);
  }

  return row;
}
